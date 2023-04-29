const signupRouter = require("express").Router();
const { celebrate, Joi } = require("celebrate");

const { createUser } = require("../controllers/users");
const PATTERN_URL = require("../utils/constants");

signupRouter.post("/", celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(PATTERN_URL),
  }),
}), createUser);

module.exports = signupRouter;
