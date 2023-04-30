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
    .then((card) => res.status(COMPLETED).send(card))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail()
    .then((card) => {
      if ((card.owner).toString() === req.user._id) {
        Card.deleteOne(card._id)
          .orFail()
          .then(res.send({ message: "Карточка удалена" }))
          .catch(next);
      } else {
        next(new ForbiddenError());
      }
    })
    .catch(next);
};

const changeLike = (req, res, addOrPull, next) => {
  Card.findByIdAndUpdate(req.params.cardId, addOrPull, { new: true })
    .orFail()
    .populate(["owner", "likes"])
    .then((card) => res.send({ card }))
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  changeLike(req, res, { $addToSet: { likes: req.user._id } }, next);
};

module.exports.dislikeCard = (req, res, next) => {
  changeLike(req, res, { $pull: { likes: req.user._id } }, next);
};
