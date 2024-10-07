const User = require("../models/User");

const getSubscribedChannels = async (req, res) => {
  console.log(
    `getSubscribedChannels route\nparams = ${JSON.stringify(req.params)}`
  );
  try {
    const user = await User.findOne({ email: req.body.email });
    const subscribedChannels = user.subscribedChannels;
    console.log(
      `getSubscribedChannels route\nresponse = ${JSON.stringify(
        subscribedChannels
      )}`
    );
    res.status(200).json({
      success: true,
      subscribedChannels: subscribedChannels,
    });
  } catch (error) {
    res.status(400).json({ success: false });
  }
};

module.exports = getSubscribedChannels;
