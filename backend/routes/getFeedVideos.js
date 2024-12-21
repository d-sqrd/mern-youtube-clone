const express = require("express");
const getFeedVideos = require("../controllers/getFeedVideos");
const router = express.Router();

console.log(`Inside getFeedVideos route`);
router.get("/", getFeedVideos);

module.exports = router;
