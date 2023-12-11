const jwt = require("jsonwebtoken");
function admin(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access denied! No token provided.");
  try {
    const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
    req.user = decoded;
    if (!req.user.isAdmin)
      return res.status(401).send("Access denied! Unauthorised user.");
    next();
  } catch (error) {
    res.status(400).send("Invalid token...");
  }
}
module.exports = admin;
