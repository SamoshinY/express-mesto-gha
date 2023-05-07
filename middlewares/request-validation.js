const { celebrate, Joi } = require("celebrate");
const PATTERN_URL = require("../utils/url-pattern");

module.exports.bodyCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(PATTERN_URL),
  }),
});

module.exports.idCard = celebrate({
  params: Joi.object().keys({ cardId: Joi.string().required().hex().length(24) }),
});

module.exports.bodyUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});

module.exports.idUser = celebrate({
  params: Joi.object().keys({ userId: Joi.string().required().hex().length(24) }),
});

module.exports.avatarUser = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().regex(PATTERN_URL),
  }),
});

module.exports.signin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

module.exports.signup = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(PATTERN_URL),
  }),
});
