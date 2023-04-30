const cardRouter = require("express").Router();
const { celebrate, Joi } = require("celebrate");
const PATTERN_URL = require("../utils/constants");

const {
  createCard,
  getCards,
  deleteCard,
  likeCard,
  dislikeCard,
} = require("../controllers/cards");

cardRouter.get("/", getCards);

cardRouter.post("/", celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(PATTERN_URL),
  }),
}), createCard);

cardRouter.delete("/:cardId", celebrate({
  params: Joi.object().keys({ cardId: Joi.string().required().hex().length(24) }),
}), deleteCard);

cardRouter.put("/:cardId/likes", celebrate({
  params: Joi.object().keys({ cardId: Joi.string().required().hex().length(24) }),
}), likeCard);

cardRouter.delete("/:cardId/likes", celebrate({
  params: Joi.object().keys({ cardId: Joi.string().required().hex().length(24) }),
}), dislikeCard);

module.exports = cardRouter;
