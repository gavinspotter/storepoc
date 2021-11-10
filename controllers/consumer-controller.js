const HttpError = require("../models/HttpError")

const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const Customer = require("../models/Customers")

const Admin = require("../models/Admin")

const Messages = require("../models/Messages")


const signup = async (req, res, next) => {
    const { email, firstName, lastName , password } = req.body

    let existingUser

    try {
        existingUser = await Customer.findOne({ email: email })
    } catch (err) {
        const error = new HttpError(
            "username already in use",
            500
        )
        return next(error)
    }

    if (existingUser) {
        const error = new HttpError("this user already exists, please login", 422)
        return next(error)
    }

    let hashedPassword;

    try {
        hashedPassword = await bcrypt.hash(password, 12);
    } catch (err) {
        const error = new HttpError(
            'Could not create user, please try again.',
            500
        );
        return next(error);
    }

    let findAdmin 

    try {
        findAdmin = await Admin.find({username: "michaelross"})
    } catch (err) {
        const error = new HttpError("couldn't add you to our directory")
        return next(error)
    }


   



    const createdCustomer = new Customer({
        firstName,
        lastName,
        email,
        
        password: hashedPassword,
        admin: findAdmin[0]._id
        

    })

    try {
        await createdCustomer.save()
    } catch (err) {

        console.log(err)
        const error = new HttpError(
            "couldnt save this action",
            500
        )
        return next(error)
    }

    let token;

    try {
        token = jwt.sign(
            { customerId: createdCustomer.id, email: createdCustomer.email },
            'supersecret_dont_share',
            { expiresIn: '24h' }
        );
    } catch (err) {
        const error = new HttpError(
            'Signing up failed, please try again later.',
            500
        );
        return next(error);
    }


    res.status(201).json({ customerId: createdCustomer.id, email: createdCustomer.email, token: token })
}


const login = async (req, res, next) => {
    const { email, password } = req.body

    let existingUser

    try {
        existingUser = await Customer.findOne({ email: email })
    } catch (err) {
        const error = new HttpError(
            "login failed",
            500
        )
        return next(error)
    }

    if (!existingUser) {
        const error = new HttpError(
            "wrong information",
            401
        )
        return next(error)
    }

    let isValidPassword = false

    try {
        isValidPassword = await bcrypt.compare(password, existingUser.password);
    } catch (err) {
        const error = new HttpError(
            'Could not log you in, please check your credentials and try again.',
            500
        );
        return next(error);
    }

    if (!isValidPassword) {
        const error = new HttpError(
            'Invalid credentials, could not log you in.',
            403
        );
        return next(error);
    }

    let token;

    try {
        token = jwt.sign(
            { customerId: existingUser.id, email: existingUser.email },
            'supersecret_dont_share',
            { expiresIn: '24h' }
        );
    } catch (err) {
        const error = new HttpError(
            'login failed, please try again later.',
            500
        );
        return next(error);
    }


    res.json({
        customerId: existingUser.id, email: existingUser.email, token: token 
    })
}





// const favoriteBulk = async (req, res, next) => {

// }

const purchaseConsumerGood = async (req, res, next) => {

}

const editDeliveryDetails = async (req, res, next) => {

    const { firstName, lastName, street, city, state, zipCode, country, email } = req.body


    let findUser 

    try {
        findUser = await Customer.findById(req.customerData.customerId)
    } catch (err) {
        const error = new HttpError("something went wrong")
        return next(error)
    }

    if(!findUser){
        const error = new HttpError("you're not logged in or your login token has expired")
        return next(error)
    }

    if(findUser._id.toString() !== req.customerData.customerId){
        const error = new HttpError("you don't have permission to access that")
        return next(error)
    }

    findUser.deliveryDetails.firstName = firstName
    findUser.deliveryDetails.lastName = lastName
    findUser.deliveryDetails.street = street
    findUser.deliveryDetails.city = city
    findUser.deliveryDetails.state = state
    findUser.deliveryDetails.zipCode = zipCode
    findUser.deliveryDetails.country = country 
    findUser.deliveryDetails.email = email

    try {
        await findUser.save()
    } catch (err) {
        const error = new HttpError("couldn't save that, sorry")
        return next(error)
    }

    res.json({findUser})




}

// const editEmail = async (req, res, next) => {

// }



const getMessages = async (req, res, next) => {

    let findUser 

    try {
        findUser = await Customer.findById(req.customerData.customerId)
    } catch (err) {
        const error = new HttpError("something went wrong")
        return next(error)
    }

    if(!findUser){
        const error = new HttpError("you're not logged in or your login token has expired")
        return next(error)
    }

    if(findUser._id.toString() !== req.customerData.customerId){
        const error = new HttpError("you don't have permission to access that")
        return next(error)
    }

    let findMessageBoard 

    try {
        findMessageBoard = await Messages.findById(findUser.messages)
    } catch (err) {
        const error = new HttpError("something went wrong")
        return next(error)
    }


    res.json({findMessageBoard})



}

const createAMessage = async (req, res, next) => {

    const { message} = req.body

    let findUser 

    try {
        findUser = await Customer.findById(req.customerData.customerId)
    } catch (err) {
        const error = new HttpError("something went wrong")
        return next(error)
    }

    if(!findUser){
        const error = new HttpError("you're not logged in or your login token has expired")
        return next(error)
    }

    if(findUser._id.toString() !== req.customerData.customerId){
        const error = new HttpError("you don't have permission to access that")
        return next(error)
    }

    let findMessageBoard 

    try {
        findMessageBoard = await Messages.findById(findUser.messages)
    } catch (err) {
        const error = new HttpError("something went wrong")
        return next(error)
    }


    const newMessage = {
        message,
        date: Date(),
        sender: req.customerData.customerId
    }

    try {
        findMessageBoard.messages.push(newMessage)
        await findMessageBoard.save()
    } catch (err) {
        const error = new HttpError("something went wrong sending that, sorry")
        return next(error)
    }


    res.json({findMessageBoard})











}

const createMessages = async (req, res, next) => {

    let findConsumer 

    try {
        findConsumer = await Customer.findById(req.customerData.customerId)
    } catch (err) {
        const error = new HttpError("something went wrong")
        return next(error)
    }

    if(!findConsumer){
        const error = new HttpError("you're not logged in")
        return next(error)
    }

    if(findConsumer.messages){
        const error = new HttpError("you already have a chat")
        return next(error)
    }


    let findAdmin 

    try {
        findAdmin = await Admin.find({username: "michaelross"})
    } catch (err) {
        const error = new HttpError("something went wrong")
        return next(error)
    }

    if(!findAdmin){
        const error = new HttpError("couldn't find the owner")
        return next(error)
    }



   
    




    const createdMessageBoard = new Messages({

        admin: findAdmin[0]._id,
        consumer: findConsumer._id,
        hidden: true,
        messages: []




    })


    try {
        await createdMessageBoard.save()
    } catch (err) {
        const error = new HttpError("couldn't save that request")
        return next(error)
    }

    findConsumer.messages = createdMessageBoard._id

    try {
       await findConsumer.save()
    } catch (err) {
        const error = new HttpError("couldn't perform this task")
        return next(error)
    }

    
    try {
        findAdmin[0].messages.push(createdMessageBoard)
        await findAdmin[0].save()
    } catch (err) {
        console.log(err)
        const error = new HttpError("couldn't perform that task")
        return next(error)
    }

    res.json({findAdmin, findConsumer, createdMessageBoard})



}

// const editMessage = async (req, res, next) => {
    
// }


exports.signup = signup

exports.login = login

// exports.favoriteBulk = favoriteBulk

exports.purchaseConsumerGood = purchaseConsumerGood

exports.editDeliveryDetails = editDeliveryDetails

// exports.editEmail = editEmail

exports.getMessages = getMessages

exports.createMessages = createMessages

exports.createAMessage = createAMessage

// exports.editMessage = editMessage