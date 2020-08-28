const mongoose = require("mongoose");

const userOrderSchema = new mongoose.Schema({
  street: {
    type: String,
    required: true,
  },
  house: {
    type: String,
    required: true,
  },
  flat: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("UserOrder", userOrderSchema);
