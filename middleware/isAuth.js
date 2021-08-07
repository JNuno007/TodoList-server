const jwt = require("jsonwebtoken");

const isValidToken = (req, res, next) => {
  const token = req.headers["Authorization"].split(" ")[1];
  if (!token) {
      return res.status(401).send("No token provided");
  }
  jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
    if (err) {
      res.status(401).send();
    } else {
      req.userId = decoded.userId;
      next();
    }
  });
};

module.exports = isValidToken;
