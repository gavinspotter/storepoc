const mongoose = require("mongoose")



const Schema = mongoose.Schema



const adminSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    messages: [{ type: mongoose.Types.ObjectId, required: true, ref: "Messages" }],
    bulkWholeSale: [{ type: mongoose.Types.ObjectId, required: true, ref: "Bulks" }],
    consumerGoods: [{ type: mongoose.Types.ObjectId, required: true, ref: "ConsumerGoods" }],
    customers: [{ type: mongoose.Types.ObjectId, required: true, ref: "Customers" }],


    
    


})


module.exports = mongoose.model("Admin", adminSchema)