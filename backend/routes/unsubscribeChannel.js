const express = require("express");
const router = express.Router();
const unsubscribeChannel = require("../controllers/unsubscribeChannel");

router.patch("/", unsubscribeChannel);

module.exports = router;
