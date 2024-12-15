const express = require("express");
const router = express.Router();
const subscribeChannel = require("../controllers/subscribeChannel");

router.patch("/", subscribeChannel);

module.exports = router;
