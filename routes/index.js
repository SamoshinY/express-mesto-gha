const router = require("express").Router();
const { celebrate, Joi } = require("celebrate");
const userRouter = require("./users");
const cardRouter = require("./cards");
const { NOT_FOUND_ERROR } = require("../utils/response-status-code");
const auth = require("../middlewares/auth");
const { login, createUser } = require("../controllers/users");
const PATTERN_URL = require("../utils/constants");

router.post("/signup", celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(PATTERN_URL),
  }),
}), createUser);

router.post("/signin", celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);

router
  .use("/users", auth, userRouter)
  .use("/cards", auth, cardRouter)
  .use("*", (req, res) => {
    res.status(NOT_FOUND_ERROR).send({ message: "Страница не найдена" });
  });

module.exports = router;
