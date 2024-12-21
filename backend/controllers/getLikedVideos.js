const User = require("../models/User");

const getLikedVideos = async (req, res) => {
  //   console.log(
  //     `getLikedVideos controller\nparams = ${JSON.stringify(req.query)}`
  //   );
  try {
    const user = await User.findOne({ email: req.query.userEmail });
    if (!user) {
      throw new Error("Error fetching user details");
    }
    const likedVideos = user.likedVideos;
    // console.log(
    //   `getLikedVideos controller\nresponse = ${JSON.stringify(likedVideos)}`
    // );
    res.status(200).json({
      success: true,
      message: "Liked Videos list successfully found in DB",
      data: {
        likedVideos: likedVideos,
      },
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err });
  }
};

module.exports = getLikedVideos;
