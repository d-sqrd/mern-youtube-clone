require("dotenv").config();
const axios = require("axios");
const getFeedVideos = async (req, res) => {
  console.log(`Inside getFeedVideos controller`);
  console.log(req.query.searchString);
  const options = {
    method: "GET",
    url: process.env.APP_URL + "/search",
    params: {
      q: req.query.searchString || "music",
      part: "snippet,id",
      regionCode: "US",
      maxResults: "20",
      order: "date",
    },
    headers: {
      "x-rapidapi-key": process.env.APP_API_KEY,
      "x-rapidapi-host": process.env.APP_HOST,
    },
  };
  try {
    const response = await axios.request(options);
    // console.log(`Feed response data = ${JSON.stringify(response.data)}`);
    res.status(200).json({
      success: true,
      message: "Feed videos successfully fetched",
      videoList: response.data.items,
    });
  } catch (err) {
    console.error(err);
    res
      .status(400)
      .json({ success: false, message: "Error fetching Feed videos" });
  }
};

module.exports = getFeedVideos;
