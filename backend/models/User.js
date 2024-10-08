const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
  },
  userName: {
    type: String,
    required: [true, "Please enter an username"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    unique: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide valid email",
    ],
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minLength: 5,
  },
  watchHistory: [
    {
      date: {
        type: Date,
      },
      videoId: {
        type: String,
      },
    },
  ],
  subscribedChannels: [
    {
      channelName: {
        type: String,
      },
      channelId: {
        type: String,
      },
    },
  ],
});

module.exports = mongoose.model("User", UserSchema);
