const mongoose = require("mongoose");
const User = require("../models/User");

const watchHistory = async (req, res) => {
  console.log(`watchHistory route\nparams = ${JSON.stringify(req.params)}`);
  try {
    const user = await User.findOne({ email: req.body.email });
    const watchHistory = user.watchHistory;
    res.status(200).json({
      success: true,
      watchHistory: {
        date: watchHistory.date,
        videoIdList: watchHistory.videoIdList,
      },
    });
  } catch (error) {
    res.status(400).json({ success: false });
  }
};

module.exports = watchHistory;
