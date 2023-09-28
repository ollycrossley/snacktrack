const mongoose = require("mongoose");

const BusinessSchema = new mongoose.Schema({
  created_at: {
    type: Date,
    default: Date.now(),
  },
  category: {
    type: String,
    required: true,
  },

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
    default:
      "https://static.vecteezy.com/system/resources/previews/013/042/571/original/default-avatar-profile-icon-social-media-user-photo-in-flat-style-vector.jpg",
  },
  business_name: {
    type: String,
    required: true,
  },
  owner_name: {
    type: String,
    required: true,
  },
  business_bio: String,
  is_active: {
    type: Boolean,
    default: true,
  },
  opening_hours: {
    monday: [String],
    tuesday: [String],
    wednesday: [String],
    thursday: [String],
    friday: [String],
    saturday: [String],
    sunday: [String],
  },
  logo_url: String,
  menu_url: String,
  total_rating: {
    type: Number,
    default: 0,
  },
  no_of_ratings: {
    type: Number,
    default: 0,
  },
  location: {
    latitude: {
      type: Number,
      default: 53.47848675379202,
    },
    longitude: {
      type: Number,
      default: -2.24325990807042,
    },
  },
});

const Business = mongoose.model("Business", BusinessSchema);
module.exports = Business;
