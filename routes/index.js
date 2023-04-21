const express = require("express");
const userRouter = require("./users");
const cardRouter = require("./cards");
const { NOT_FOUND_ERROR } = require("../constants/response-status-code");

const router = express.Router();

router
  .use("/users", userRouter)
  .use("/cards", cardRouter)
  .use("*", (req, res) => {
    res.status(NOT_FOUND_ERROR).send({ message: "Страница не найдена" });
  });

module.exports = router;
