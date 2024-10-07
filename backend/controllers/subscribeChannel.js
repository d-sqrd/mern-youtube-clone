const User = require("../models/User");

const subscribeChannel = async (req, res) => {
  console.log(
    `subscribe-channel-route...req.body = ${JSON.stringify(req.body)}`
  );
  try {
    const user = await User.findOneAndUpdate(
      { email: req.body.email },
      // { $push: { subscribedChannelIds: [req.params.channelId] } },
      {
        $push: {
          subscribedChannels: [
            {
              channelName: req.body.channelName,
              channelId: req.body.channelId,
            },
          ],
        },
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      subscribedChannels: user.subscribedChannels,
    });
  } catch (error) {
    console.log(`err = ${error}`);
    return res.status(400).json({ success: false });
  }
};

module.exports = subscribeChannel;
