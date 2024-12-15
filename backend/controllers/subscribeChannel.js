const User = require("../models/User");
const unsubscribeChannel = require("./unsubscribeChannel");

const updateUserDocument = async (req, res) => {
  const updatedUser = await User.updateOne(
    { email: req.body.user.email },
    {
      $push: {
        subscribedChannels: [
          {
            channelName: req.body.channel.channelName,
            channelId: req.body.channel.channelId,
          },
        ],
      },
    }
  );
  if (!updatedUser) {
    throw new Error("Error adding channel to Subcribed Channels list");
  }
  res.status(200).json({
    success: true,
    message:
      "Channel successfully added to Subscribed Channels list of current user",
  });
};

const subscribeChannel = async (req, res) => {
  try {
    const user = await User.findOne(
      { email: req.body.user.email },
      {
        subscribedChannels: 1,
      }
    );
    if (!user) {
      throw new Error("User could not be found");
    }
    if (user.subscribedChannels.length) {
      const filteredSubscribedChannelsList = user.subscribedChannels.filter(
        (subscribedChannel) =>
          subscribedChannel.channelId === req.body.channel.channelId
      );
      if (filteredSubscribedChannelsList.length) {
        // subscribe button of an already subscribed channel was clicked -> remove the channel from the Subscribed Channels list of current user
        unsubscribeChannel(req, res);
      } else {
        updateUserDocument(req, res);
      }
    } else {
      updateUserDocument(req, res);
    }
  } catch (err) {
    console.log(`err = ${err}`);
    return res.status(400).json({ success: false, message: err });
  }
};

module.exports = subscribeChannel;
