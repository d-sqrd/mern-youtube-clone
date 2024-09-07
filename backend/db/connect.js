const mongoose = require("mongoose");

const connectDB = async (url) => {
  console.log("Inside connectDB method");
  return mongoose.connect(url, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
    useUnifiedTopology: true,
  });
};

module.exports = connectDB;
