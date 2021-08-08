const jwt = require("jsonwebtoken");
var express = require("express");
var router = express.Router();

router.get("/", (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res.status(401).send({message: "No token provided"});
  }
  jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
    if (err) {
      res.status(401).send();
    } else {
      res.status(200).send();
    }
  });
});

module.exports = router;
