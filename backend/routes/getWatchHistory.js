const getWatchHistory = require("../controllers/getWatchHistory");
const express = require("express");
const router = express.Router();

router.get("/", getWatchHistory);

module.exports = router;
