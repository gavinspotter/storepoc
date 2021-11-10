const HttpError = require("../models/HttpError")
const config = require('../config.json')

const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const Customer = require("../models/Customers")

const Admin = require("../models/Admin")

const Messages = require("../models/Messages")
const ConsumerGoods = require("../models/ConsumerGoods")
const stripe = require("stripe")(config.secretKey)

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


    let stripeCustomerId

    try {
        stripeCustomerId = await stripe.customers.create({
            description: "Welcome!"
        })
    } catch (err) {
        const error = new HttpError("something went wrong, sorry")
        return next(error)
    }
   



    const createdCustomer = new Customer({
        firstName,
        lastName,
        email,
        stripeCustomerId: stripeCustomerId.id,
        
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

const purchaseConsumerGoodOnAccount = async (req, res, next) => {


    const { itemId } = req.body

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

    let findItem 

    try {
        findItem = await ConsumerGoods.findById(itemId)
    } catch (err) {
        const error = new HttpError("something has gone wrong, sorry")
        return next(error)
    }
    console.log(findItem)

    const customer = await stripe.customers.retrieve(
        findUser.stripeCustomerId
    );

    if(!customer.default_source){
        const error = new HttpError("you haven't added a card yet")
        return next(error)
    }


    findItem.sold = true
    findItem.customer = findUser._id

    try {
        await findItem.save()
    } catch (err) {
        const error = new HttpError("couldn't save that")
        return next(error)
    }



    try {
        findUser.consumerPurchases.push(findItem._id)
        await findUser.save()
    } catch (err) {
        const error = new HttpError("couldn't save that")
        return next(error)
    }



    




    const charge = await stripe.charges.create({
        amount: findItem.price,
        currency: 'usd',
        customer: customer.id,
        source: customer.default_source,
        description: 'My First Test Charge (created for API docs)',

    });

    res.json({ findItem, findUser, charge })


}

const editDeliveryDetails = async (req, res, next) => {

    const { firstName, lastName, street, city, state, zipCode, country, email, number, exp_month, exp_year, cvc } = req.body


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

    let token



    try {
        token = await stripe.tokens.create({
            card: {
                number: number ,
                exp_month: exp_month,
                exp_year: exp_year,
                cvc: cvc,
            },
        });
    } catch (err) {
        const error = new HttpError("had trouble processing your card")
        return next(error)
    }


    const customer = await stripe.customers.update(
        findUser.stripeCustomerId,
        {
            source: token.id,

        }

    );



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

    res.json({findUser, customer})




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

exports.purchaseConsumerGoodOnAccount = purchaseConsumerGoodOnAccount

// exports.editEmail = editEmail

exports.getMessages = getMessages

exports.createMessages = createMessages

exports.createAMessage = createAMessage

// exports.editMessage = editMessage