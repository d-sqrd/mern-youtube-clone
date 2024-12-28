const axios = require("axios");

const getRelatedVideos = async (req, res) => {
  console.log(`related-vids...params = ${JSON.stringify(req.query)}`);
  const options = {
    method: "GET",
    url: `${process.env.APP_URL}/search`,
    params: {
      relatedToVideoId: req.query.relatedVideoId,
      part: "id,snippet",
      type: "video",
      maxResults: "10",
    },
    headers: {
      "x-rapidapi-key": process.env.APP_API_KEY,
      "x-rapidapi-host": process.env.APP_HOST,
    },
  };
  try {
    const response = await axios.request(options);
    console.log(response.data);
    res.status(200).json({ videoList: response.data.items });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err });
  }
};

module.exports = getRelatedVideos;
