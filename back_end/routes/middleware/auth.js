const jwt = require("jsonwebtoken");
const verifyToken = (req, res, next) => {
  const authorizationHeader = req.headers["authorization"];
  const token = authorizationHeader && authorizationHeader.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
    if (err) return res.status(403).json({ errorCode: -1, data: null });
    req.userId = data.userId;
    req.isAdmin = data.isAdmin;
    next();
  });
};
module.exports = verifyToken;
