const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const register = async (req, res) => {
  try {
    // const { email, password } = req.body;
    // add null checks for name, userName, email and password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;
    const user = await User.create({ ...req.body });
    // console.log(`user = ${user}`);
    const jwtToken = await jwt.sign(
      { userId: user._id, email: req.body.email },
      process.env.JWT_SECRET
    );
    console.log(`Inside /register route...`);
    res
      .status(200)
      .send({ user: { userName: req.body.userName }, authToken: jwtToken });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
};
const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(
    `auth-controller-login-route....\nemail = ${email}\npassword=${password}`
  );
  if (!email || !password) {
    console.log("empty email/password");
    return res.status(400).send("Email and password cannot be empty");
  }
  const user = await User.findOne({ email: email });
  if (!user) {
    console.log("user does not exist");
    return res.status(400).send(`User with ${email} email-ID does not exist`);
  }
  const comparePassword = await bcrypt.compare(password, user.password);
  if (!comparePassword) {
    console.log("wrong password");
    return res.status(400).send("Please enter correct password");
  }
  console.log("login success");
  const jwtToken = await jwt.sign(
    { userId: user._id, email: email },
    process.env.JWT_SECRET
  );
  res.status(200).json({ message: "Success", authToken: jwtToken });
};

module.exports = { register, login };
