const express = require("express");
const getChannelVideos = require("../controllers/getChannelVideos");
const router = express.Router();

router.get("/", getChannelVideos);

module.exports = router;
