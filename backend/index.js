const express = require("express");
const app = express();
const PORT = 5000;
require("dotenv").config();

const authRouter = require("./routes/auth");
const watchHistoryRouter = require("./routes/watchHistory");
const subscribeChannel = require("./routes/subscribeChannel");
const authenticateUser = require("./middleware/authenticateUser");

const connectDB = require("./db/connect");
app.use(express.json());
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/watchHistory", authenticateUser, watchHistoryRouter);
app.use("/api/v1/subscribeChannel", authenticateUser, subscribeChannel);
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
