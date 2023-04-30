const userRouter = require("express").Router();
const { celebrate, Joi } = require("celebrate");
const PATTERN_URL = require("../utils/constants");

const {
  getCurrentUser,
  getUser,
  getUsers,
  updateProfile,
  updateAvatar,
} = require("../controllers/users");

userRouter.get("/", getUsers);

userRouter.get("/me", getCurrentUser);

userRouter.get("/:userId", celebrate({
  params: Joi.object().keys({ userId: Joi.string().required().hex().length(24) }),
}), getUser);

userRouter.patch("/me", celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateProfile);

userRouter.patch("/me/avatar", celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().regex(PATTERN_URL),
  }),
}), updateAvatar);

module.exports = userRouter;
