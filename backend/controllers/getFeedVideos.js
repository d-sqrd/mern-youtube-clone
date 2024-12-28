require("dotenv").config();
const axios = require("axios");
const { youtube } = require("@googleapis/youtube");
const yt = youtube({ version: "v3", auth: process.env.YOUTUBE_API_KEY });

const getFeedVideos = async (req, res) => {
  try {
    const response = await yt.search.list({
      part: "id,snippet",
      type: "video",
      q: req.query.searchString || "music",
      channelId: req.query.channelId,
    });
    console.log(JSON.stringify(response.data));
    res.status(200).json({ videoList: response.data });
  } catch (error) {
    console.log(`feed-error...${error}`);
    res.status(400).json({ message: "Failed to fetch videos" });
  }
};

module.exports = getFeedVideos;
