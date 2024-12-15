const express = require("express");
const removeLikedVideo = require("../controllers/removeLikedVideo");
const router = express.Router();

router.patch("/", removeLikedVideo);

module.exports = router;
