const cors = require("cors");
const express = require("express");
const app = express();
const PORT = 5000;
require("dotenv").config();

const getFeedVideos = require("./routes/getFeedVideos");
const authRouter = require("./routes/auth");
const getWatchHistoryRouter = require("./routes/getWatchHistory");
const addWatchHistoryRouter = require("./routes/addWatchHistory");
const subscribeChannel = require("./routes/subscribeChannel");
const unsubscribeChannel = require("./routes/unsubscribeChannel");
const getSubscribedChannels = require("./routes/getSubscribedChannels");
const authenticateUser = require("./middleware/authenticateUser");
const deleteFromWatchHistory = require("./controllers/deleteFromWatchHistory");
const addLikedVideo = require("./routes/addLikedVideo");
const removeLikedVideo = require("./routes/removeLikedVideo");

const connectDB = require("./db/connect");
const getLikedVideos = require("./controllers/getLikedVideos");
app.use(cors());
app.use(express.json());
app.use("/api/v1/feed/videos", getFeedVideos);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/watchHistory", authenticateUser, getWatchHistoryRouter);
app.use("/api/v1/addToWatchHistory", authenticateUser, addWatchHistoryRouter);
app.use(
  "/api/v1/deleteFromWatchHistory",
  authenticateUser,
  deleteFromWatchHistory
);
app.use("/api/v1/subscribeChannel", authenticateUser, subscribeChannel);
app.use("/api/v1/unsubscribeChannel", authenticateUser, unsubscribeChannel);
app.use(
  "/api/v1/getSubscribedChannels",
  authenticateUser,
  getSubscribedChannels
);
app.use("/api/v1/addLikedVideo", authenticateUser, addLikedVideo);
app.use("/api/v1/removeLikedVideo", authenticateUser, removeLikedVideo);
app.use("/api/v1/getLikedVideos", authenticateUser, getLikedVideos);
// app.use("/", (req, res) => {
//   res.send("hello");
// });

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`Server is listening on PORT = ${PORT}`);
    });
  } catch (err) {
    console.log(`Failed to start server\nErrors = ${err}`);
  }
};

start();
