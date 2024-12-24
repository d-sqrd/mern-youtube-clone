const express = require("express");
const getFeedVideos = require("../controllers/getFeedVideos");
const router = express.Router();

router.get("/", getFeedVideos);

module.exports = router;
