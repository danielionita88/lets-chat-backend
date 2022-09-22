const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      require: true,
      max: 20,
      min: 2,
    },
    last_name: {
      type: String,
      require: true,
      max: 20,
      min: 2,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
      min: 6,
    },
    current_location_city: {
      type: String,
      min: 3,
      default: "",
    },
    current_location_country: {
      type: String,
      min: 3,
      default: "",
    },
    from_city: {
      type: String,
      min: 3,
      default: "",
    },
    from_country: {
      type: String,
      min: 3,
      default: "",
    },
    relationship: {
      type: String,
      min: 3,
      default: "",
    },
    profile_picture: {
      type: String,
      default: "",
    },
    friends: {
      type: Array,
      default: [],
    },
    posts: {
      type: Array,
      default: [],
    },
    likes: {
      type: Array,
      default: [],
    },
    tagged: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
