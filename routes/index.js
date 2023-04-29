const router = require("express").Router();
const userRouter = require("./users");
const cardRouter = require("./cards");
const signinRouter = require("./signin");
const signupRouter = require("./signup");
const PageNotFoundRouter = require("./non-existent-paths");
const auth = require("../middlewares/auth");

router
  .use("/signup", signupRouter)
  .use("/signin", signinRouter)
  .use("/users", auth, userRouter)
  .use("/cards", auth, cardRouter)
  .use("*", PageNotFoundRouter);

module.exports = router;
