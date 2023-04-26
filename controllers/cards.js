/* eslint-disable no-shadow */
const Card = require("../models/card");
const { COMPLETED } = require("../utils/response-status-code");
const { handlerErrors } = require("../utils/handler-errors");

module.exports.getCards = (req, res) => {
  Card.find({})
    .populate(["owner", "likes"])
    .then((cards) => res.send({ data: cards }))
    .catch((err) => handlerErrors(err, res));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => card.populate("owner"))
    .then((card) => res.status(COMPLETED).send({ data: card }))
    .catch((err) => handlerErrors(err, res));
};

module.exports.deleteCard = (req, res) => {
  Card.findById(req.params.cardId)
    .orFail()
    .then((card) => {
      if ((card.owner).toString() === req.user._id) {
        console.log("это моё, можно удалять");
        Card.findByIdAndRemove(req.params.cardId)
          .orFail()
          .then((card) => res.send({ data: card }))
          .catch((err) => handlerErrors(err, res));
      } else {
        throw new Error("нельзя удалять эту карточку, она не моя!)");
      }
    })
    .catch((err) => handlerErrors(err, res));
};

module.exports.likeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } },
  { new: true },
)
  .orFail()
  .populate(["owner", "likes"])
  .then((card) => res.send({ data: card }))
  .catch((err) => handlerErrors(err, res));

module.exports.dislikeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } },
  { new: true },
)
  .orFail()
  .populate(["owner", "likes"])
  .then((card) => res.send({ data: card }))
  .catch((err) => handlerErrors(err, res));
