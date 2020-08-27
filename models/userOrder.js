const mongoose = require("mongoose");

const userOrderSchema = new mongoose.Schema({
  street: {
    type: String,
    required: true,
  },
  houseNumber: {
    type: String,
    required: true,
  },
  flatNumber: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("UserOrder", userOrderSchema);
