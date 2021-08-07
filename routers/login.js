const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user.model");
var express = require("express");
var router = express.Router();

router.post("/register", (req, res, next) => {
  const { username, password } = req.body;
  if (username && password) {
    User.findOne({ username }, (err, user) => {
      if (user !== null) {
        res.status(404).send({
          message: "Username already taken!",
        });
      } else {
        bcrypt
          .hash(password, Number(process.env.SALT_ROUNDS))
          .then((hashedPassword) => {
            User.create({
              username,
              password: hashedPassword,
            })
              .then((user) => {
                res.status(200).send("User created");
              })
              .catch((error) => {
                res.status(500).send("An internal error has ocurred");
              });
          });
      }
    });
  } else {
    res.status(404).send("Missing fields");
  }
});

router.get("/signin", (req, res, next) => {
  const { username, password } = req.query;
  if (username && password) {
    User.findOne({ username }, (err, user) => {
      if (user) {
        bcrypt.compare(password, user.password).then((result) => {
          if (result) {
            const token = jwt.sign(
              { id: user.username, timestamp: Date.now() },
              process.env.JWT_SECRET,
              { expiresIn: "6h" },
            );
            res.status(200).send({
              auth: true,
              token: token,
              message: "user found & logged in",
            });
          } else {
            res.status(404).send("Username and/or password are incorrect");
          }
        });
      } else {
        res.status(404).send("Username and/or password are incorrect");
      }
    });
  } else {
    res.status(404).send("Missing credentials");
  }
});

module.exports = router;
