const Card = require("../models/card");
const { COMPLETED } = require("../utils/response-status-code");
const ForbiddenError = require("../utils/errors/ForbiddenError");

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .populate(["owner", "likes"])
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => card.populate("owner"))
    .then((card) => res.status(COMPLETED).send({ data: card }))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail()
    .then((card) => {
      if ((card.owner).toString() === req.user._id) {
        Card.findByIdAndRemove(req.params.cardId)
          .orFail()
          .then((cardData) => res.send({ data: cardData }))
          .catch(next);
      } else {
        next(new ForbiddenError());
      }
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } },
  { new: true },
)
  .orFail()
  .populate(["owner", "likes"])
  .then((card) => res.send({ data: card }))
  .catch(next);

module.exports.dislikeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } },
  { new: true },
)
  .orFail()
  .populate(["owner", "likes"])
  .then((card) => res.send({ data: card }))
  .catch(next);
