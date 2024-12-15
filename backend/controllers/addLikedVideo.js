const User = require("../models/User");
const removeLikedVideo = require("./removeLikedVideo");

const updateUserDocument = async (req, res) => {
  const updatedUser = await User.updateOne(
    { email: req.body.user.email },
    {
      $push: {
        likedVideos: [
          {
            videoId: req.body.videoDetail.videoId,
            videoDetail: req.body.videoDetail.videoDetail,
          },
        ],
      },
    }
  );
  if (!updatedUser) {
    throw new Error("Error adding video to Liked Videos list");
  }
  res.status(200).json({
    success: true,
    message: "Video successfully added to Liked Videos list of current user",
  });
};

const addLikedVideo = async (req, res) => {
  try {
    const user = await User.findOne(
      {
        email: req.body.user.email,
      },
      {
        likedVideos: 1,
      }
    );
    if (!user) {
      throw new Error("User could not be found");
    }
    if (user.likedVideos.length) {
      const filterdLikedVideoList = user.likedVideos.filter(
        (likedVideo) => likedVideo.videoId === req.body.videoDetail.videoId
      );
      if (filterdLikedVideoList.length) {
        // like button of an already liked video was clicked -> remove the video from the Liked Videos list of current user
        removeLikedVideo(req, res);
      } else {
        updateUserDocument(req, res);
      }
    } else {
      updateUserDocument(req, res);
    }
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err,
    });
  }
};

module.exports = addLikedVideo;
