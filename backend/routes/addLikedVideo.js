const express = require("express");
const addLikedVideo = require("../controllers/addLikedVideo");
const router = express.Router();

router.patch("/", addLikedVideo);

module.exports = router;
