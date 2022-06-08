const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  username: {
    type: String,
    max: 50,
  },
  password: {
    type: String,
    min: 6,
    max: 255,
  },
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
  email: {
    type: String,
  },
  mobile_number: {
    type: String,
  },
  image: {
    type: String,
  },
  created_at: {
    type: String,
    default: Date.now,
  },
  updated_at: {
    type: String,
    default: Date.now,
  },
});

module.exports = mongoose.model("Adminauth", schema);
