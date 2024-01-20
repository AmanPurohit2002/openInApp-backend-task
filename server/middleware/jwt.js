const jwt = require("jsonwebtoken");
// require('dotenv').config();

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization");
  const bearerToken=token.split(' ');
  const newToken=bearerToken[1];

  if (!newToken) {
    res.status(401).json({ error: "Unauthorized - Token not provided" });
  }

  jwt.verify(newToken, process.env.JWT_SECRET_KEY, (err, decode) => {
    if (err) {
      return res.status(403).json({ error: "Forbidden - Invalid token" });
    }

    req.user = {
      user_id: decode.user_id,
    };

    

    next();
  });
};

module.exports = authMiddleware;
