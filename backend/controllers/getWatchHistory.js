const User = require("../models/User");

const getWatchHistory = async (req, res) => {
  console.log(`watchHistory route\nparams = ${JSON.stringify(req.params)}`);
  try {
    const user = await User.findOne({ email: req.query.userEmail });
    if (!user) {
      throw new Error("Error fetching user details");
    }
    const watchHistory = user.watchHistory;
    res.status(200).json({
      success: true,
      message: "Liked Videos list successfully found in DB",
      data: {
        watchHistory: watchHistory,
      },
    });
  } catch (error) {
    res.status(400).json({ success: false });
  }
};

module.exports = getWatchHistory;
