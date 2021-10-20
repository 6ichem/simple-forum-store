const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  const authToken = req.headers.authorization;
  try {
    if (authToken) {
      const token = authToken.split(" ")[1];
      if (token) {
        const userData = jwt.verify(token, "app");
        req.userId = userData.userId;
        next();
      } else {
        next();
      }
    } else {
      next();
    }
  } catch (e) {
    req.userId = null;
    next();
  }
};
