const User = require("../models/User");

const subscribeChannel = async (req, res) => {
  console.log(`req.params = ${JSON.stringify(req.body.email)}`);
  try {
    const user = await User.findOneAndUpdate(
      { email: req.body.email },
      { $push: { subscribedChannelIds: [req.params.channelId] } },
      { new: true }
    );
    res.status(200).json({
      success: true,
      subscribeChannelList: user.subscribedChannelList,
    });
  } catch (error) {
    console.log(`err = ${error}`);
    return res.status(400).json({ success: false });
  }
};

module.exports = subscribeChannel;
