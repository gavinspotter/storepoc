const HttpError = require("../models/HttpError")

const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const Customer = require("../models/Customers")



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

   



    const createdCustomer = new Customer({
        firstName,
        lastName,
        email,
        
        password: hashedPassword,
        

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
    const { username, password } = req.body

    let existingUser

    try {
        existingUser = await Admin.findOne({ username: username })
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
            { userId: existingUser.id, username: existingUser.username },
            'supersecret_dont_share',
            { expiresIn: '1h' }
        );
    } catch (err) {
        const error = new HttpError(
            'Logging in failed, please try again later.',
            500
        );
        return next(error);
    }


    res.json({
        userId: existingUser.id,
        username: existingUser.username,
        token: token
    })
}





const favoriteBulk = async (req, res, next) => {

}

const purchaseConsumerGood = async (req, res, next) => {

}

const editDeliveryDetails = async (req, res, next) => {

}

const editEmail = async (req, res, next) => {

}



const getMessages = async (req, res, next) => {

}

const createMessages = async (req, res, next) => {

}

const editMessage = async (req, res, next) => {
    
}


exports.signup = signup

exports.login = login

exports.favoriteBulk = favoriteBulk

exports.purchaseConsumerGood = purchaseConsumerGood

exports.editDeliveryDetails = editDeliveryDetails

exports.editEmail = editEmail

exports.getMessages = getMessages

exports.createMessages = createMessages

exports.editMessage = editMessage