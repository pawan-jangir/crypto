const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
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
  },
  mobile_number: {
    type: String,
    max: 10,
    required: true,
  },
  password: {
    type: String,
    min: 6,
    max: 255,
    required: true,
  },
  skill_level: {
    type: String,
  },
  relationship: {
    type: String,
  },
  dob: {
    type: String,
  },
  image: {
    type: String,
  },
  cover_image: {
    type: String,
  },
  bio: {
    type: String,
  },
  address_line1: {
    type: String,
  },
  address_line2: {
    type: String,
  },
  country: {
    type: String,
  },
  state: {
    type: String,
  },
  area: {
    type: String,
  },
  city: {
    type: String,
  },
  postal_code: {
    type: String,
  },
  website_url: {
    type: String,
  },
  facebook_username: {
    type: String,
  },
  instagram_username: {
    type: String,
  },
  twitter_username: {
    type: String,
  },
  linkedin_username: {
    type: String,
  },
  youtube_username: {
    type: String,
  },

  approved: {
    type: Boolean,
    default: false,
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

module.exports = mongoose.model("User", schema);
