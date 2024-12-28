const axios = require("axios");
require("dotenv").config();

const getChannelVideos = async (req, res) => {
  const options = {
    method: "GET",
    url: process.env.APP_URL + "/search",
    params: {
      channelId: req.query.channelId,
      part: "snippet,id",
      order: "date",
      maxResults: "50",
    },
    headers: {
      "x-rapidapi-key": process.env.APP_API_KEY,
      "x-rapidapi-host": process.env.APP_HOST,
    },
  };

  try {
    const response = await axios.request(options);
    if (response.status === 200) {
      res.status(200).json({
        success: true,
        message: "Channel videos successfully fetched",
        videoList: response.data.items,
      });
    } else {
      throw new Error();
    }
  } catch (err) {
    console.error(err);
    res
      .status(400)
      .json({ success: false, message: "Error fetching Channel videos" });
  }
};

module.exports = getChannelVideos;
