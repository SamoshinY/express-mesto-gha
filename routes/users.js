const userRouter = require("express").Router();

const {
  createUser,
  getUser,
  getUsers,
  updateProfile,
  updateAvatar,
} = require("../controllers/users");

userRouter.get("/", getUsers);

userRouter.get("/:userId", getUser);

userRouter.post("/", createUser);

userRouter.patch("/me", updateProfile);

userRouter.patch("/me/avatar", updateAvatar);

module.exports = userRouter;
