const User = require("../models/User");

const deleteFromWatchHistory = async (req, res) => {
  try {
    console.log(
      `delete-from-watch-history route1...req.body = ${JSON.stringify(
        req.body
      )}`
    );
    const user = await User.findOneAndUpdate(
      { email: req.body.user.email },
      {
        $pull: {
          watchHistory: {
            "videoDetail.id.videoId": req.body.videoDetail.videoId,
          },
        },
      },
      { new: true }
    );
    if (!user) {
      // throw new Error("Error deleting video from watch history");
      throw new Error();
    }
    // console.log(`delete-from-watch-history route...res = ${user}`);
    res.status(200).json({
      success: true,
      message: "Video successfully removed from user's Watch History",
      data: {
        watchHistory: user.watchHistory,
      },
    });
  } catch (err) {
    console.log(`delete-from-watch-history route2...error = ${err}`);
    res.status(400).json({ success: false, message: err });
  }
};

module.exports = deleteFromWatchHistory;
