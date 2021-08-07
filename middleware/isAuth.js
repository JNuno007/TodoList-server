const jwt = require("jsonwebtoken");

isValidToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res.status(401).send("No token provided");
  }
  jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
    if (err) {
      res.status(401).send();
    } else {
      req.user = { userId: decoded.id, username: decoded.username };
      next();
    }
  });
};
module.exports = isValidToken;
