const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const consumerGoodsSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: String, required: true },
  deliveryDetails: {
    firstName: { type: String },
    lastName: { type: String },
    street: { type: String },
    city: { type: String },
    state: { type: String },
    zipCode: { type: String },
    country: { type: String },
    email: { type: String },
  },
  sold: { type: Boolean },
  delivered: {
    isDelivered: { type: Boolean },

    deliveryDate: { type: String },
  },
  notes: { type: String },
  bucketPhotoId: { type: String, required: true },
  admin: { type: mongoose.Types.ObjectId, required: true, ref: "Admin" },
  customer: { type: mongoose.Types.ObjectId, ref: "Customers" },
});

module.exports = mongoose.model("ConsumerGoods", consumerGoodsSchema);
