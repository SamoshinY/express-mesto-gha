const mongoose = require("mongoose");
const PATTERN_URL = require("../utils/url-pattern");

const cardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Обязательное поле не заполнено"],
      minlength: [2, "Минимальная длина строки - два символа"],
      maxlength: [30, "Максимальная длина строки - тридцать символов"],
    },
    link: {
      type: String,
      required: [true, "Обязательное поле не заполнено"],
      validate: {
        validator: (value) => PATTERN_URL.test(value),
        message: "Некорректная ссылка",
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        default: [],
        ref: "user",
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model("card", cardSchema);
