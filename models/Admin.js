const mongoose = require("mongoose")



const Schema = mongoose.Schema



const adminSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    messages: {},
    bulkWholeSale: {},
    ConsumerGoods: {},


    
    stripeBusinessId: { type: String }



})


module.exports = mongoose.model("Admin", adminSchema)