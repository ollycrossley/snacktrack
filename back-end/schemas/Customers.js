const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    // validate: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
  },
  password: {
    type: String,
    required: true,
    // validate: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[]:;<>,.?\/~_+-=|\]).{8,32}$/
  },
  avatar_url: {
    type: String,
    required: false,
    default:
      "https://static.vecteezy.com/system/resources/previews/013/042/571/original/default-avatar-profile-icon-social-media-user-photo-in-flat-style-vector.jpg",
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

const Customer = mongoose.model("Customer", CustomerSchema);
module.exports = Customer;
