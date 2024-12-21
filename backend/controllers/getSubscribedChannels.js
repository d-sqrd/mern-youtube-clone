const User = require("../models/User");

const getSubscribedChannels = async (req, res) => {
  console.log(
    `getSubscribedChannels route\nparams = ${JSON.stringify(req.query)}`
  );
  try {
    const user = await User.findOne({ email: req.query.userEmail });
    if (!user) {
      throw new Error("Error fetching user details");
    }
    const subscribedChannels = user.subscribedChannels;
    console.log(
      `getSubscribedChannels route\nresponse = ${JSON.stringify(
        subscribedChannels
      )}`
    );
    res.status(200).json({
      success: true,
      message: "Subcribed Channel list successfully found in DB",
      data: {
        subscribedChannels: subscribedChannels,
      },
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err });
  }
};

module.exports = getSubscribedChannels;
