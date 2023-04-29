const jwt = require("jsonwebtoken");
const AuthError = require("../utils/errors/AuthError");

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return next(new AuthError("Требуется авторизация!"));
  }

  let payload;

  try {
    payload = jwt.verify(token, "secret-key");
  } catch (err) {
    return next(new AuthError("Требуется авторизация!"));
  }

  req.user = payload;

  return next();
};
