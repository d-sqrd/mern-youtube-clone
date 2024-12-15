const User = require("../models/User");

const addToWatchHistory = async (req, res) => {
  console.log(
    // `inside add-to-watch-history route...body = ${JSON.stringify(req.body)}`
    `inside add-to-watch-history route...body = ${req.body.watchHistory.videoDetail}`
  );
  try {
    const updatedUser = await User.findOneAndUpdate(
      {
        email: req.body.email,
      },
      {
        $push: {
          watchHistory: [
            {
              date: req.body.watchHistory.date,
              videoDetail: req.body.watchHistory.videoDetail,
            },
          ],
        },
      },
      { new: true }
    );
    console.log(`add-to-watch-history route...user = ${updatedUser}`);
    res.status(200).json({
      success: true,
      watchHistory: updatedUser.watchHistory,
    });
  } catch (error) {
    console.log(`add-to-watch-history route...error = ${error}`);
    res.status(400).json({ success: false });
  }
};

module.exports = addToWatchHistory;
