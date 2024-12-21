const express = require("express");
const router = express.Router();
const getLikedVideos = require("../controllers/getLikedVideos");

router.get("/", getLikedVideos);

module.exports = router;
