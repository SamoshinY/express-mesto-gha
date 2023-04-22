const express = require("express");

const mongoose = require("mongoose");

const { PORT = 3000 } = process.env;
const app = express();
const router = require("./routes/index");

mongoose.connect("mongodb://127.0.0.1:27017/mestodb");

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: "643f028e6c973c4a872ec4f5",
  };

  next();
});

app.use(router);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
