const jwt = require("jsonwebtoken");
const authMiddleware = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).json({ msg: "unauthorized" });
  }
  const token = authorization.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { id, user } = decoded;
    req.user = { id, user };
    next();
  } catch (error) {
    return res.status(401).json({ msg: "unauthorized" });
  }
};
module.exports = authMiddleware;
