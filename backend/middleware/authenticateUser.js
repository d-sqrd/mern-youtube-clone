const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const authenticateUser = async (req, res, next) => {
  console.log("Inside authenticateUser route");
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(401).send("Unauthorized user");
  }
  try {
    const token = authHeader.split(" ")[1];
    const payLoad = jwt.verify(token, process.env.JWT_SECRET);
    req.body.email = payLoad.email;
    next();
  } catch (error) {
    return res.status(401).send("Unauthorized user");
  }
};

module.exports = authenticateUser;
