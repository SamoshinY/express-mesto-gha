const express = require("express");

const mongoose = require("mongoose");

const { PORT = 3000 } = process.env;
const app = express();
const { userRouter, cardRouter } = require("./routes");

mongoose.connect("mongodb://127.0.0.1:27017/mestodb");

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: "643f028e6c973c4a872ec4f5",
  };

  next();
});

app.use(userRouter);
app.use(cardRouter);
app.use("*", (req, res) => {
  res.status(404).send({ message: "Страница не найдена" });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
