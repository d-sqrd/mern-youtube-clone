const express = require("express");
const router = express.Router();
const subscribeChannel = require("../controllers/subscribeChannel");

router.post("/", subscribeChannel);

module.exports = router;
