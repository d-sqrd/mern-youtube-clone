const express = require("express");
const router = express.Router();
const addToWatchHistory = require("../controllers/addWatchHistory");

router.patch("/", addToWatchHistory);

module.exports = router;
