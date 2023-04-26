const userRouter = require("express").Router();

const {
  getUser,
  getUsers,
  updateProfile,
  updateAvatar,
} = require("../controllers/users");

userRouter.get("/", getUsers);

userRouter.get("/:userId", getUser);

userRouter.patch("/me", updateProfile);

userRouter.patch("/me/avatar", updateAvatar);

module.exports = userRouter;
