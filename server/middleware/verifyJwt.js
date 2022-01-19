const jwt = require("jsonwebtoken");
const verifyJWT = (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    res.send("We need a token");
  } else {
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        res.send(false);
      } else {
        req._id = decoded.id;
        next();
      }
    });
  }
};

module.exports = verifyJWT;
