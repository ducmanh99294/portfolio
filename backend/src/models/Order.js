const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  status: {
    type: String,
    enum: ["pending", "confirmed", "designing", "shipping", "completed", "cancelled"],
    default: "pending"
  },

  totalPrice: {
    type: Number,
    default: 0
  },

  shippingAddress: {
    fullName: String,
    phone: String,
    address: String,
    note: String
  }

}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);
