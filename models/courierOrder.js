const mongoose = require("mongoose");

const courierOrderSchema = new mongoose.Schema({
  restaurant: {
    type: String,
    required: true,
  },
  orderInput: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  oldPrice: {
    type: Number,
    required: true,
  },
  newPrice: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("CourierOrder", courierOrderSchema);
