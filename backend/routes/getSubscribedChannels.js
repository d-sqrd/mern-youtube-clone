const express = require("express");
const router = express.Router();
const getSubscribedChannels = require("../controllers/getSubscribedChannels");

router.get("/", getSubscribedChannels);

module.exports = router;
