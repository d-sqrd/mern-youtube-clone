const express = require("express");
const deleteFromWatchHistory = require("../controllers/deleteFromWatchHistory");
const router = express.Router();

router.delete("/", deleteFromWatchHistory);

module.exports = router;
