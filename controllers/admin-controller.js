const HttpError = require("../models/HttpError");

const Admin = require("../models/Admin");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const aws = require("aws-sdk"); //"^2.2.41"

const multer = require("multer"); // "^1.3.0"
const multerS3 = require("multer-s3"); //"^2.7.0"
const { v4: uuidv4 } = require("uuid");
const Bulk = require("../models/BulkWholeSale");
const ConsumerGoods = require("../models/ConsumerGoods");
const Messages = require("../models/Messages");

const fs = require("fs");
const Customers = require("../models/Customers");

const signup = async (req, res, next) => {
  const { username, password } = req.body;

  let existingUser;

  try {
    existingUser = await Admin.findOne({ username: username });
  } catch (err) {
    const error = new HttpError("username already in use", 500);
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError("this user already exists, please login", 422);
    return next(error);
  }

  let hashedPassword;

  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    const error = new HttpError(
      "Could not create user, please try again.",
      500
    );
    return next(error);
  }

  const createdAdmin = new Admin({
    username,

    password: hashedPassword,
  });

  try {
    await createdAdmin.save();
  } catch (err) {
    console.log(err);
    const error = new HttpError("couldnt save this action", 500);
    return next(error);
  }

  let token;

  try {
    token = jwt.sign(
      { userId: createdAdmin.id, username: createdAdmin.username },
      "supersecret_dont_share",
      { expiresIn: "24h" }
    );
  } catch (err) {
    const error = new HttpError(
      "Signing up failed, please try again later.",
      500
    );
    return next(error);
  }

  res.status(201).json({
    userId: createdAdmin.id,
    username: createdAdmin.username,
    token: token,
  });
};

const login = async (req, res, next) => {
  const { username, password } = req.body;

  let existingUser;

  try {
    existingUser = await Admin.findOne({ username: username });
  } catch (err) {
    const error = new HttpError("login failed", 500);
    return next(error);
  }

  if (!existingUser) {
    const error = new HttpError("wrong information", 401);
    return next(error);
  }

  let isValidPassword = false;

  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    const error = new HttpError(
      "Could not log you in, please check your credentials and try again.",
      500
    );
    return next(error);
  }

  if (!isValidPassword) {
    const error = new HttpError(
      "Invalid credentials, could not log you in.",
      403
    );
    return next(error);
  }

  let token;

  try {
    token = jwt.sign(
      { userId: existingUser.id, username: existingUser.username },
      "supersecret_dont_share",
      { expiresIn: "24h" }
    );
  } catch (err) {
    const error = new HttpError(
      "Logging in failed, please try again later.",
      500
    );
    return next(error);
  }

  res.json({
    userId: existingUser.id,
    username: existingUser.username,
    token: token,
  });
};

const createBulkItem = async (req, res, next) => {
  const { name, description, price, bucketPhotoId } = req.body;

  let findUser;

  try {
    findUser = await Admin.findById(req.userData.userId);
  } catch (err) {
    const error = new HttpError("something went wrong you're not logged in");
    return next(error);
  }

  if (!findUser) {
    const error = new HttpError("you're not logged in");
    return next(error);
  }

  const s3 = new aws.S3({
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  });

  const uniqueId = uuidv4();

  const fileContent = fs.readFileSync(req.files.bucketPhotoId.path);

  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: `${uniqueId}-${req.files.bucketPhotoId.name}`, // File name you want to save as in S3
    Body: fileContent,
  };
  s3.upload(params, function (err, data) {
    if (err) {
      throw err;
    }
    console.log(`File uploaded successfully. `);
  });

  const createdBulk = new Bulk({
    name,
    description,
    price,
    bucketPhotoId: `${uniqueId}-${req.files.bucketPhotoId.name}`,

    admin: req.userData.userId,
  });

  try {
    await createdBulk.save();
  } catch (err) {
    const error = new HttpError("couldn't save that");
    return next(error);
  }

  try {
    findUser.bulkWholeSale.push(createdBulk);
  } catch (err) {
    const error = new HttpError("something went wrong");
    return next(error);
  }

  try {
    findUser.save();
  } catch (err) {
    const error = new HttpError("couldn't save your entry");
    return next(error);
  }

  res.json({ findUser, createdBulk });
};

const getBulkItems = async (req, res, next) => {
  let findBulk;

  try {
    findBulk = await Bulk.find();
  } catch (err) {
    const error = new HttpError("couldn't load the bulk items");
    return next(error);
  }

  res.json({ findBulk });
};

const updateBulkItem = async (req, res, next) => {
  const { bulkId, name, description, price } = req.body;

  let findAdmin;

  try {
    findAdmin = await Admin.findById(req.userData.userId);
  } catch (err) {
    const error = new HttpError("something went wrong");
    return next(error);
  }

  if (!findAdmin) {
    const error = new HttpError("you're not logged in, michael");
    return next(error);
  }

  let findBulk;

  try {
    findBulk = await Bulk.findById(bulkId);
  } catch (err) {
    const error = new HttpError("something went wrong");
    return next(error);
  }

  if (!findBulk) {
    const error = new HttpError("that's not a bulk item");
    return next(error);
  }

  if (findBulk.admin.toString() !== req.userData.userId) {
    const error = new HttpError("you're not the creator of this bulk");
    return next(error);
  }

  findBulk.name = name;
  findBulk.price = price;
  findBulk.description = description;

  try {
    await findBulk.save();
  } catch (err) {
    const error = new HttpError("something went wrong saving that");
    return next(error);
  }

  res.json({ findBulk });
};

const deleteBulkItem = async (req, res, next) => {
  const bulkId = req.params.bulkId;

  let findAdmin;

  try {
    findAdmin = await Admin.findById(req.userData.userId);
  } catch (err) {
    const error = new HttpError("something went wrong");
    return next(error);
  }

  if (!findAdmin) {
    const error = new HttpError("you're not logged in");
    return next(error);
  }

  let bulk;

  try {
    bulk = await Bulk.findById(bulkId);
  } catch (err) {
    const error = new HttpError("something went wrong");
    return next(error);
  }

  if (!bulk) {
    const error = new HttpError("thats not a product");
    return next(error);
  }

  if (bulk.admin.toString() !== req.userData.userId) {
    const error = new HttpError("you don't have permission to do that");
    return next(error);
  }

  try {
    await bulk.remove();
    findAdmin.bulkWholeSale.pull(bulk);
  } catch (err) {
    const error = new HttpError("couldn't delete that bulk item");
    return next(error);
  }

  try {
    await findAdmin.save();
  } catch (err) {
    const error = new HttpError("couldn't save that");
    return next(error);
  }

  res.json({ findAdmin });
};

const createConsumerItem = async (req, res, next) => {
  const { name, description, price, notes, bucketPhotoId } = req.body;

  if (description.length > 251) {
    const error = new HttpError("that's to long of a description");
    return next(error);
  }

  let findUser;

  try {
    findUser = await Admin.findById(req.userData.userId);
  } catch (err) {
    const error = new HttpError("something went wrong you're not logged in");
    return next(error);
  }

  if (!findUser) {
    const error = new HttpError("you're not logged in");
    return next(error);
  }

  if (!name || !description || !price || !req.files.bucketPhotoId.path) {
    const error = new HttpError("sorry, you're missing a field");
    return next(error);
  }

  const s3 = new aws.S3({
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  });

  const uniqueId = uuidv4();
  console.log(req.files);

  const fileContent = fs.readFileSync(req.files.bucketPhotoId.path);

  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: `${uniqueId}-${req.files.bucketPhotoId.name}`, // File name you want to save as in S3
    Body: fileContent,
  };
  s3.upload(params, function (err, data) {
    if (err) {
      throw err;
    }
    console.log(`File uploaded successfully. `);
  });

  const createdItem = new ConsumerGoods({
    name,
    description,
    price,
    bucketPhotoId: `${uniqueId}-${req.files.bucketPhotoId.name}`,

    admin: req.userData.userId,
  });

  try {
    await createdItem.save();
  } catch (err) {
    console.log(err);
    const error = new HttpError("couldn't save that");
    return next(error);
  }

  try {
    findUser.consumerGoods.push(createdItem);
  } catch (err) {
    const error = new HttpError("something went wrong");
    return next(error);
  }

  try {
    findUser.save();
  } catch (err) {
    const error = new HttpError("couldn't save your entry");
    return next(error);
  }

  res.json({ findUser, createdItem });
};

const getConsumerItems = async (req, res, next) => {
  let findConsumerItems;

  try {
    findConsumerItems = await ConsumerGoods.find();
  } catch (err) {
    const error = new HttpError("something went wrong");
    return next(error);
  }

  res.json({ findConsumerItems });
};

const updateConsumerItem = async (req, res, next) => {
  const { itemId } = req.body;

  let findAdmin;

  try {
    findAdmin = await Admin.findById(req.userData.userId);
  } catch (err) {
    const error = new HttpError("something went wrong");
    return next(error);
  }

  if (!findAdmin) {
    const error = new HttpError("you're not logged in, michael");
    return next(error);
  }

  let findItem;

  try {
    findItem = await ConsumerGoods.findById(itemId);
  } catch (err) {
    const error = new HttpError("something went wrong");
    return next(error);
  }

  if (!findItem) {
    const error = new HttpError("that's not a consumer item");
    return next(error);
  }

  if (findItem.admin.toString() !== req.userData.userId) {
    const error = new HttpError("you're not the creator of this bulk");
    return next(error);
  }

  findItem.delivered.isDelivered = true;
  findItem.delivered.deliveryDate = new Date();

  try {
    await findItem.save();
  } catch (err) {
    const error = new HttpError("couldn't save that");
    return next(error);
  }

  res.json({ findItem });
};

const deleteConsumerItem = async (req, res, next) => {
  const itemId = req.params.itemId;

  let findAdmin;

  try {
    findAdmin = await Admin.findById(req.userData.userId);
  } catch (err) {
    const error = new HttpError("something went wrong");
    return next(error);
  }

  if (!findAdmin) {
    const error = new HttpError("you're not logged in");
    return next(error);
  }

  let item;

  try {
    item = await ConsumerGoods.findById(itemId);
  } catch (err) {
    const error = new HttpError("something went wrong");
    return next(error);
  }

  if (!item) {
    const error = new HttpError("thats not an item");
    return next(error);
  }

  if (item.admin.toString() !== req.userData.userId) {
    const error = new HttpError("you don't have permission to do that");
    return next(error);
  }

  try {
    await item.remove();
    findAdmin.consumerGoods.pull(item);
  } catch (err) {
    const error = new HttpError("couldn't delete that item");
    return next(error);
  }

  try {
    await findAdmin.save();
  } catch (err) {
    const error = new HttpError("couldn't save that");
    return next(error);
  }

  res.json({ findAdmin });
};

const getMessages = async (req, res, next) => {
  let findAdmin;

  try {
    findAdmin = await Admin.findById(req.userData.userId);
  } catch (err) {
    const error = new HttpError("something went wrong");
    return next(error);
  }

  if (!findAdmin) {
    const error = new HttpError("you're not logged in.");
    return next(error);
  }

  let findMessages;

  try {
    findMessages = await Messages.find({ _id: findAdmin.messages });
  } catch (err) {
    const error = new HttpError("something went wrong");
    return next(error);
  }

  res.json({ findMessages });
};

const createAMessage = async (req, res, next) => {
  const { message, messageBoardId } = req.body;

  let findAdmin;

  try {
    findAdmin = await Admin.findById(req.userData.userId);
  } catch (err) {
    const error = new HttpError("something went wrong");
    return next(error);
  }

  if (!findAdmin) {
    const error = new HttpError("you're not logged in, michael");
    return next(error);
  }

  const newMessage = {
    message,
    date: Date.now(),
    sender: req.userData.userId,
  };

  let findMessageBoard;

  try {
    findMessageBoard = await Messages.findById(messageBoardId);
  } catch (err) {
    const error = new HttpError("something went wrong");
    return next(error);
  }

  try {
    findMessageBoard.messages.push(newMessage);
    await findMessageBoard.save();
  } catch (err) {
    const error = new HttpError("something went wrong adding that message");
    return next(error);
  }

  res.json({ findMessageBoard });
};

// const getMessageBoards = async (req, res, next) => {

//     let findAdmin

//     try {
//         findAdmin = await Admin
//     } catch (err) {

//     }

// }

// const editMessage = async (req, res, next) => {

// }

const getCustomer = async (req, res, next) => {
  const consumerId = req.params.consumerId;

  let findAdmin;

  try {
    findAdmin = await Admin.findById(req.userData.userId);
  } catch (err) {
    const error = new HttpError("something went wrong");
    return next(error);
  }

  if (!findAdmin) {
    const error = new HttpError("you're not logged in, michael");
    return next(error);
  }

  let findConsumer;

  try {
    findConsumer = await Customers.findById(consumerId);
  } catch (err) {
    const error = new HttpError("something went wrong finding that customer");
    return next(error);
  }

  res.json({ findConsumer });
};

const getAConsumerItem = async (req, res, next) => {
  const itemId = req.params.itemId;

  let findItem;

  try {
    findItem = await ConsumerGoods.findById(itemId);
  } catch (err) {
    const error = new HttpError("something went wrong with that request");
    return next(error);
  }

  res.json({ findItem });
};

const getABulkItem = async (req, res, next) => {
  const itemId = req.params.itemId;

  let findItem;

  try {
    findItem = await Bulk.findById(itemId);
  } catch (err) {
    const error = new HttpError("something went wrong with that request");
    return next(error);
  }

  res.json({ findItem });
};

exports.signup = signup;

exports.login = login;

exports.getAConsumerItem = getAConsumerItem;

exports.getABulkItem = getABulkItem;

exports.createBulkItem = createBulkItem;

exports.getBulkItems = getBulkItems;

exports.updateBulkItem = updateBulkItem;

exports.deleteBulkItem = deleteBulkItem;

exports.createConsumerItem = createConsumerItem;

exports.getConsumerItems = getConsumerItems;

exports.updateConsumerItem = updateConsumerItem;

exports.deleteConsumerItem = deleteConsumerItem;

exports.getMessages = getMessages;

exports.createAMessage = createAMessage;

exports.getCustomer = getCustomer;

// exports.editMessage = editMessage
