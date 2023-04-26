const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Обязательное поле не заполнено"],
      minlength: [2, "Минимальная длина строки - два символа"],
      maxlength: [30, "Максимальная длина строки - тридцать символов"],
    },
    about: {
      type: String,
      required: [true, "Обязательное поле не заполнено"],
      minlength: [2, "Минимальная длина строки - два символа"],
      maxlength: [30, "Максимальная длина строки - тридцать символов"],
    },
    avatar: {
      type: String,
      required: [true, "Обязательное поле не заполнено"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model("user", userSchema);
