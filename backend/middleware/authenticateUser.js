const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const authenticateUser = async (req, res, next) => {
  console.log(
    `Inside authenticateUser route1...req.body = ${JSON.stringify(req.body)}`
  );
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(401).send("Unauthorized user");
  }
  try {
    const token = authHeader.split(" ")[1];
    const payLoad = jwt.verify(token, process.env.JWT_SECRET);
    if ("user" in req.body) {
      req.body.user.email = payLoad.email;
    } else {
      req.body.email = payLoad.email;
    }
    console.log(
      `Inside authenticateUser route2...req.body = ${JSON.stringify(req.body)}`
    );
    // req.body.email = payLoad.email;
    // req.body.user.email = payLoad.email;
    next();
  } catch (err) {
    console.log(`authenticateUser route...error = ${err}`);
    return res.status(401).send("Unauthorized user");
  }
};

module.exports = authenticateUser;
