



const mongoose = require("mongoose")



const Schema = mongoose.Schema


const customerSchema = new Schema({

    firstName: { type: String, required: true },
    lastName: {type: String, required: true},
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true },
    stripeCustomerId: {type: String},
    bulkSeeings: [ ],
    consumerPurchases: [],
    deliveryDetails: {
        firstName: {type: String},
        lastName: {type: String},
        street: {type: String},
        city: {type: String},
        state: {type: String},
        zipCode: {type: String},
        country: {type: String},
        email: {type: String}

    },
    
    messages: { type: mongoose.Types.ObjectId, ref: "Messages" },
    //admin: { type: mongoose.Types.ObjectId, required: true, ref: "Admin" }
    


})



module.exports = mongoose.model("Customers", customerSchema)