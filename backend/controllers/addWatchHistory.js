const User = require("../models/User");

const addToWatchHistory = async (req, res) => {
  console.log(
    // `inside add-to-watch-history route...body = ${JSON.stringify(req.body)}`
    `inside add-to-watch-history route...body = ${req.body.watchHistory.videoId}`
  );
  try {
    // const user = await User.findOneAndUpdate(
    //   {
    //     email: req.body.email,
    //     watchHistory: [{ videoId: req.body.watchHistory.videoId }],
    //   },
    //   {
    //     $push: {
    //       watchHistory: [
    //         {
    //           date: req.body.watchHistory.date,
    //           videoId: req.body.watchHistory.videoId,
    //         },
    //       ],
    //     },
    //   },
    //     { upsert: true }
    // );

    const user = await User.updateOne(
      {
        email: req.body.email,
        "watchHistory.videoId": req.body.watchHistory.videoId,
      },
      {
        $push: {
          watchHistory: [
            {
              date: req.body.watchHistory.date,
              videoId: req.body.watchHistory.videoId,
            },
          ],
        },
      },
      { upsert: true }
    );
    console.log(`add-to-watch-history route...user = ${user}`);
    res.status(200).json({
      success: true,
      watchHistory: user.watchHistory,
    });
  } catch (error) {
    console.log(`add-to-watch-history route...error = ${error}`);
    res.status(400).json({ success: false });
  }
};

module.exports = addToWatchHistory;
