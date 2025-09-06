const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("./config");

const authMiddleware = (req, res, next) => {
  const authheader = req.header.authorization;

  if (!authheader || !authheader.startsWith("Bearer")) {
    return res.status(403).json({});
  }
  const token = authheader.split("")[1];

  const decodeduser = jwt.verify(token, JWT_SECRET);
  if (decodeduser) {
    req.userId = decoderuser.id;
    next();
  } else {
    return res.status(403).json({});
  }
};

module.exports = {
  authMiddleware,
};
