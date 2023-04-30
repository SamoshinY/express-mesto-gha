const userRouter = require("express").Router();
const { bodyUser, idUser, avatarUser } = require("../middlewares/request-validation");

const {
  getCurrentUser,
  getUser,
  getUsers,
  updateProfile,
  updateAvatar,
} = require("../controllers/users");

userRouter.get("/", getUsers);

userRouter.get("/me", getCurrentUser);

userRouter.get("/:userId", idUser, getUser);

userRouter.patch("/me", bodyUser, updateProfile);

userRouter.patch("/me/avatar", avatarUser, updateAvatar);

module.exports = userRouter;
