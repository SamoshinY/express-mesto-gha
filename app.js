require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");

const { PORT = 3000 } = process.env;
const app = express();
const cors = require("cors");
const { errors } = require("celebrate");
const router = require("./routes/index");
const errorsHandler = require("./middlewares/handler-errors");
const rateLimiter = require("./middlewares/rate-limiter");
const { requestLogger, errorLogger } = require("./middlewares/logger");
// const corsHandler = require("./middlewares/cors-processing");

// app.use(corsHandler);

mongoose.connect("mongodb://127.0.0.1:27017/mestodb");
app.use(cors());
app
  .use(express.json())
  .use(helmet())
  .use(rateLimiter)
  .use(cookieParser())
  .use(requestLogger)
  .use(router)
  .use(errorLogger)
  .use(errors())
  .use(errorsHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
