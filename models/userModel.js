const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      require: true,
      max: 20,
      min: 2,
    },
    lastName: {
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
    currentLocationCity: {
      type: String,
      min: 3,
      default: "",
    },
    currentLocationCountry: {
      type: String,
      min: 3,
      default: "",
    },
    fromCity: {
      type: String,
      min: 3,
      default: "",
    },
    fromCountry: {
      type: String,
      min: 3,
      default: "",
    },
    relationship: {
      type: String,
      min: 3,
      default: "",
    },
    profilePicture: {
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
