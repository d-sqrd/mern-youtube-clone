const watchHistory = require("../controllers/getWatchHistory");
const express = require("express");
const router = express.Router();

// console.log("route123");
router.get("/", watchHistory);
module.exports = router;
