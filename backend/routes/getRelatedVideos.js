const express = require("express");
const getRelatedVideos = require("../controllers/getRelatedVideos");
const router = express.Router();

router.get("/", getRelatedVideos);

module.exports = router;
