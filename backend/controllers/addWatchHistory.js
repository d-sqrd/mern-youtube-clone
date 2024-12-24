const User = require("../models/User");

const addToWatchHistory = async (req, res) => {
  // console.log(
  //   `inside add-to-watch-history route...body = ${JSON.stringify(req.body)}`
  // );
  try {
    const updatedUser = await User.findOneAndUpdate(
      {
        email: req.body.user.email,
      },
      {
        $push: {
          watchHistory: [
            {
              date: req.body.data.watchHistory.date,
              videoDetail: req.body.data.watchHistory.videoDetail,
            },
          ],
        },
      },
      { new: true }
    );
    // console.log(`add-to-watch-history route...user = ${updatedUser}`);
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
