const express = require("express");
const router = express.Router();
const addToWatchHistory = require("../controllers/addWatchHistory");

router.post("/", addToWatchHistory);

module.exports = router;
