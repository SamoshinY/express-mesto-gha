const jwt = require("jsonwebtoken");
const AuthError = require("../utils/errors/AuthError");

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return next(new AuthError("Требуется авторизация!"));
  }

  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === "production" ? JWT_SECRET : "dev-secret",
    );
  } catch (err) {
    return next(new AuthError("Требуется авторизация!"));
  }

  req.user = payload;

  return next();
};
