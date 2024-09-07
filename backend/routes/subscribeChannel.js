const express = require("express");
const subscribeChannel = require("../controllers/subscribeChannel");
const router = express.Router();

router.post("/:channelId", subscribeChannel);

module.exports = router;
