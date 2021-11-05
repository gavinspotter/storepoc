const mongoose = require("mongoose")



const Schema = mongoose.Schema

const messagesSchema = new Schema({
    message: {type: String, required: true},
    date: {type: String, required: true},
    sender: { type: mongoose.Types.ObjectId, required: true}
})


const messageSchema = new Schema({

    messages: [messagesSchema],
    admin: { type: mongoose.Types.ObjectId, required: true, ref: "Admin" },
    consumer: { type: mongoose.Types.ObjectId, required: true, ref: "Consumers" }




})



module.exports = mongoose.model("Messages", messageSchema)