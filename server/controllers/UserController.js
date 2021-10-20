const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

router.get("/initialize", async (req, res) => {
  const user = await User.findById(req.userId);

  res.send({ user });
});

router.post("/register", async (req, res) => {
  const userExists = await User.findOne({ email: req.body.email });

  if (userExists) {
    return res.status(400).send({
      message: "There is a user registered with this email already",
    });
  }

  const newUser = User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    role: "regular user",
  });

  console.log(userExists);

  await newUser.save();

  return res.sendStatus(201);
});

router.post("/login", async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (!user) {
    return res.status(400).send({
      message: "User cannot be found!",
    });
  }

  const passwordIsEqual = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (!passwordIsEqual) {
    return res.status(401).send({
      message: "Password is incorrect",
    });
  }

  const token = jwt.sign(
    {
      userId: user._id,
    },
    "app"
  );

  res.send({
    user,
    token,
  });
});

module.exports = router;
