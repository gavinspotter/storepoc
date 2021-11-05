const mongoose = require("mongoose")



const Schema = mongoose.Schema


const consumerGoodsSchema = new Schema({

    name: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: String, required: true},
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
    sold: {type: Boolean},
    delivered: {type: Boolean},
    notes: {type: String},
    bucketPhotoId: {type: String, required: true},


})



module.exports = mongoose.model("ConsumerGoods", consumerGoodsSchema)