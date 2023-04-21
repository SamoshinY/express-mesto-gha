const Card = require("../models/card");
const {
  NOT_FOUND_ERROR,
  BAD_DATA_ERROR,
  DEFAULT_ERROR,
  COMPLETED,
} = require("../constants/response-status-code");

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) =>
      res.status(DEFAULT_ERROR).send({ message: "Что-то пошло не так..." })
    );
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => card.populate("owner"))
    .then((card) => res.status(COMPLETED).send({ data: card }))
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

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail(() => {
      throw new Error("Not found");
    })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(BAD_DATA_ERROR).send({ message: "Некорректный Id" });
      } else if (err.message === "Not found") {
        res.status(NOT_FOUND_ERROR).send({ message: "Карточка не найдена" });
      } else {
        res.status(DEFAULT_ERROR).send({ message: "Что-то пошло не так..." });
      }
    });
};

module.exports.likeCard = (req, res) =>
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      throw new Error("Not found");
    })
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(BAD_DATA_ERROR).send({ message: "Некорректный Id" });
      } else if (err.message === "Not found") {
        res.status(NOT_FOUND_ERROR).send({ message: "Карточка не найдена" });
      } else if (err.name === "ValidationError") {
        const message = Object.values(err.errors)
          .map((e) => e.message)
          .join(", ");
        res.status(BAD_DATA_ERROR).send({ message });
      } else {
        res.status(DEFAULT_ERROR).send({ message: "Что-то пошло не так..." });
      }
    });

module.exports.dislikeCard = (req, res) =>
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      throw new Error("Not found");
    })
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(BAD_DATA_ERROR).send({ message: "Некорректный Id" });
      } else if (err.message === "Not found") {
        res.status(NOT_FOUND_ERROR).send({ message: "Карточка не найдена" });
      } else if (err.name === "ValidationError") {
        const message = Object.values(err.errors)
          .map((e) => e.message)
          .join(", ");
        res.status(BAD_DATA_ERROR).send({ message });
      } else {
        res.status(DEFAULT_ERROR).send({ message: "Что-то пошло не так..." });
      }
    });
