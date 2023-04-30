const cardRouter = require("express").Router();
const { bodyCard, idCard } = require("../middlewares/request-validation");

const {
  createCard,
  getCards,
  deleteCard,
  likeCard,
  dislikeCard,
} = require("../controllers/cards");

cardRouter.get("/", getCards);

cardRouter.post("/", bodyCard, createCard);

cardRouter.delete("/:cardId", idCard, deleteCard);

cardRouter.put("/:cardId/likes", idCard, likeCard);

cardRouter.delete("/:cardId/likes", idCard, dislikeCard);

module.exports = cardRouter;
