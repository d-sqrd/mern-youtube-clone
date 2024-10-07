const express = require("express");
const router = express.Router();
const unsubscribeChannel = require("../controllers/unsubscribeChannel");

router.post("/", unsubscribeChannel);

module.exports = router;
