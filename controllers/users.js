const User = require("../models/user");
const {
  NOT_FOUND_ERROR,
  BAD_DATA_ERROR,
  DEFAULT_ERROR,
  COMPLETED,
} = require("../constants/response-status-code");

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(COMPLETED).send({ data: user }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        const message = Object.values(err.errors)
          .map((e) => e.message)
          .join(", ");
        res.status(BAD_DATA_ERROR).send({ message });
      } else {
        res.status(DEFAULT_ERROR).send({ message: "Что-то пошло не так..." });
      }
    });
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
    .orFail(() => {
      throw new Error("Not found");
    })
    .then((user) => {
      if (!user) {
        throw new Error("Not found");
      } else {
        res.send({ data: user });
      }
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(BAD_DATA_ERROR).send({ message: "Некорректный Id" });
      } else if (err.message === "Not found") {
        res.status(NOT_FOUND_ERROR).send({ message: "Пользователь не найден" });
      } else {
        res.status(DEFAULT_ERROR).send({ message: "Что-то пошло не так..." });
      }
    });
};

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) =>
      res.status(DEFAULT_ERROR).send({ message: "Что-то пошло не так..." })
    );
};

module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
    }
  )
    .orFail(() => {
      throw new Error("Not found");
    })
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.message === "Not found") {
        res.status(NOT_FOUND_ERROR).send({ message: "Пользователь не найден" });
      } else if (err.name === "ValidationError") {
        const message = Object.values(err.errors)
          .map((e) => e.message)
          .join(", ");
        res.status(BAD_DATA_ERROR).send({ message });
      } else {
        res.status(DEFAULT_ERROR).send({ message: "Что-то пошло не так..." });
      }
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
    }
  )
    .orFail(() => {
      throw new Error("Not found");
    })
    .then((userAvatar) => res.status(200).send({ data: userAvatar }))
    .catch((err) => {
      if (err.message === "Not found") {
        res.status(NOT_FOUND_ERROR).send({ message: "Пользователь не найден" });
      } else if (err.name === "ValidationError") {
        const message = Object.values(err.errors)
          .map((e) => e.message)
          .join(", ");
        res.status(BAD_DATA_ERROR).send({ message });
      } else {
        res.status(DEFAULT_ERROR).send({ message: "Что-то пошло не так..." });
      }
    });
};
