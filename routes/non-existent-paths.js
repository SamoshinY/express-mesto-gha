const router = require("express").Router();
const NotFoundError = require("../utils/errors/NotFoundError");

router.use("*", (req, res, next) => {
  next(new NotFoundError("Страницв не найдена"));
});

module.exports = router;
