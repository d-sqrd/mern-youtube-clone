const User = require("../models/User");

const unsubscribeChannel = async (req, res) => {
  try {
    const updatedUser = await User.updateOne(
      { email: req.body.email },
      { $pull: { subscribedChannels: { channelId: req.body.channelId } } }
    );
    if (!updatedUser) {
      throw new Error("Error unsubscribing channel");
    }
    res.status(200).json({ success: true });
  } catch (error) {
    console.log(`unsubscribe-channel route...error = ${error}`);
  }
};

module.exports = unsubscribeChannel;
