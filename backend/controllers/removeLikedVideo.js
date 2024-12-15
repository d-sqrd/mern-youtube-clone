const User = require("../models/User");

const removeLikedVideo = async (req, res) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { email: req.body.user.email },
      { $pull: { likedVideos: { videoId: req.body.videoDetail.videoId } } }
    );
    if (!updatedUser) {
      throw new Error("Error removing video from Liked Videos list");
    }
    res.status(200).json({
      success: true,
      message:
        "Video successfully removed from Liked Videos list of current user",
    });
  } catch (err) {
    console.log(`remove-liked-video route...error = ${err}`);
    res.status(400).json({
      success: false,
      message: err,
    });
  }
};

module.exports = removeLikedVideo;
