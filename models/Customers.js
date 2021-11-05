



const mongoose = require("mongoose")



const Schema = mongoose.Schema


const customerSchema = new Schema({

    firstName: { type: String, required: true },
    lastName: {type: String, required: true},
    email: { type: String, required: true},
    stripeCustomerId: {type: String},
    bulkSeeings: [ ],
    consumerPurchases: [],
    deliveryDetails: {
        firstName: {type: String, required: true},
        lastName: {type: String, required: true},
        street: {type: String, required: true},
        city: {type: String, required: true},
        state: {type: String, required: true},
        zipCode: {type: String, required: true},
        country: {type: String, required: true},
        email: {type: String, required: true}

    },
    messages: { type: mongoose.Types.ObjectId, required: true, ref: "Messages" },
    admin: { type: mongoose.Types.ObjectId, required: true, ref: "Admin" }
    


})



module.exports = mongoose.model("Customers", customerSchema)