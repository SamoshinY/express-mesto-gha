require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");

const { PORT = 3000 } = process.env;
const app = express();
const { errors } = require("celebrate");
const router = require("./routes/index");
const errorsHandler = require("./middlewares/handler-errors");
const rateLimiter = require("./middlewares/rate-limiter");

mongoose.connect("mongodb://127.0.0.1:27017/mestodb");

app.use(express.json())
  .use(helmet())
  .use(rateLimiter)
  .use(cookieParser())
  .use(router)
  .use(errors())
  .use(errorsHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
