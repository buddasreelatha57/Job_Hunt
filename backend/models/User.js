const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

  name: String,

  email: {
    type: String,
    unique: true
  },

  password: String,

  photo: String,

  profession: String,

  phone: String

});

module.exports = mongoose.model("User", userSchema);