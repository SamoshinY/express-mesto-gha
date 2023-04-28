const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const AuthError = require("../utils/errors/AuthError");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: "Жак-Ив Кусто",
      minlength: [2, "Минимальная длина строки - два символа"],
      maxlength: [30, "Максимальная длина строки - тридцать символов"],
    },
    about: {
      type: String,
      default: "Исследователь",
      minlength: [2, "Минимальная длина строки - два символа"],
      maxlength: [30, "Максимальная длина строки - тридцать символов"],
    },
    avatar: {
      type: String,
      default: "https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png",
    },
    email: {
      type: String,
      required: [true, "Поле 'email' обязательно для заполнения"],
      unique: true,
      validate: {
        validator: (value) => validator.isEmail(value),
        message: "Некорректный email-адрес",
      },
    },
    password: {
      type: String,
      required: [true, "Поле 'password' обязательно для заполнения"],
      select: false,
    },
  },
  { versionKey: false },
);

// eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select("+password")
    .then((user) => {
      if (!user) {
        return Promise.reject(new AuthError("Неправильное имя пользователя или пароль"));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new AuthError("Неправильное имя пользователя или пароль"));
          }

          return user;
        });
    });
};

module.exports = mongoose.model("user", userSchema);
