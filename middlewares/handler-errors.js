const { DocumentNotFoundError, ValidationError, CastError } = require("mongoose").Error;
const AuthError = require("../utils/errors/AuthError");
const DuplicateKeyError = require("../utils/errors/DuplicateKeyError");
const ForbiddenError = require("../utils/errors/ForbiddenError");
const NotFoundError = require("../utils/errors/NotFoundError");

const {
  NOT_FOUND_ERROR,
  BAD_DATA_ERROR,
  DEFAULT_ERROR,
  DUPLICATE_KEY_ERROR,
  FORBIDDEN_ERROR,
  AUTH_ERROR,
} = require("../utils/response-status-code");

module.exports = (err, req, res, next) => {
  switch (true) {
    case err instanceof ValidationError:
      return res.status(BAD_DATA_ERROR).send({
        message: `Введены некорректные двнные: ${Object.values(err.errors)
          .map((e) => e.message)
          .join(", ")}`,
      });
    case err instanceof DocumentNotFoundError:
      return res
        .status(NOT_FOUND_ERROR)
        .send({ message: "Запрашиваемый документ не найден" });
    case err instanceof CastError:
      return res.status(BAD_DATA_ERROR).send({ message: "Некорректный Id" });
    case err instanceof DuplicateKeyError:
      return res.status(DUPLICATE_KEY_ERROR).send({ message: err.message });
    case err instanceof ForbiddenError:
      return res.status(FORBIDDEN_ERROR).send({ message: err.message });
    case err instanceof AuthError:
      return res.status(AUTH_ERROR).send({ message: err.message });
    case err instanceof NotFoundError:
      return res.status(NOT_FOUND_ERROR).send({ message: err.message });
    default: res.status(DEFAULT_ERROR).send({ message: `Что-то пошло не так... ${err.name}: ${err.message}` });
  }
  return next();
};
