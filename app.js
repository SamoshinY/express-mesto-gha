const express = require("express");
const mongoose = require("mongoose");

const { PORT = 3000 } = process.env;
const app = express();
const router = require("./routes/index");
const { login, createUser } = require("./controllers/users");
const auth = require("./middlewares/auth");

mongoose.connect("mongodb://127.0.0.1:27017/mestodb");

app.use(express.json())
  .use((req, res, next) => {
    req.user = {
      _id: "643f028e6c973c4a872ec4f5",
    };

    next();
  });
app.post("/signin", login);
app.post("/signup", createUser);

app.use(auth, router);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
