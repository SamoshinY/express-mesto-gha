const express = require("express");
const mongoose = require("mongoose");

const { PORT = 3000 } = process.env;
const app = express();
// const cookieParser = require("cookie-parser");
const router = require("./routes/index");
const { login, createUser } = require("./controllers/users");
const auth = require("./middlewares/auth");

mongoose.connect("mongodb://127.0.0.1:27017/mestodb");

// app.use(cookieParser());
app.use(express.json());

app.post("/signin", login);
app.post("/signup", createUser);

app.use(auth, router);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
