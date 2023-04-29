const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const { PORT = 3000 } = process.env;
const app = express();
const { errors } = require("celebrate");
const router = require("./routes/index");
const errorsHandler = require("./middlewares/handler-errors");

mongoose.connect("mongodb://127.0.0.1:27017/mestodb");

app.use(express.json());
app.use(cookieParser());
app.use(router);
app.use(errors());
app.use(errorsHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
