const User = require("../models/User");

const unsubscribeChannel = async (req, res) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { email: req.body.email },
      {
        $pull: {
          subscribedChannels: { channelId: req.body.channel.channelId },
        },
      }
    );
    if (!updatedUser) {
      throw new Error("Error unsubscribing channel");
    }
    res
      .status(200)
      .json({ success: true, message: "Successfully unsubscribed channel" });
  } catch (err) {
    console.log(`unsubscribe-channel route...error = ${err}`);
    res.status(400).json({ success: false, message: err });
  }
};

module.exports = unsubscribeChannel;
