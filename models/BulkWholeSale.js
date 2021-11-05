const mongoose = require("mongoose")



const Schema = mongoose.Schema


const bulkSchema = new Schema({

    name: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    bucketPhotoId: {type: String, required: true},
    sold: {type: Boolean},
    admin: { type: mongoose.Types.ObjectId, required: true, ref: "Admin" }
    


})



module.exports = mongoose.model("Bulks", bulkSchema)