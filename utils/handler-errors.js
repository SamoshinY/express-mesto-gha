/* eslint-disable operator-linebreak */
const { DocumentNotFoundError, ValidationError, CastError } =
  require("mongoose").Error;

const {
  NOT_FOUND_ERROR,
  BAD_DATA_ERROR,
  DEFAULT_ERROR,
} = require("./response-status-code");

const handlerErrors = (err, res) => {
  const errMessage = Object.values(err.errors)
    .map((e) => e.message)
    .join(", ");
  switch (true) {
    case err instanceof ValidationError:
      return res
        .status(BAD_DATA_ERROR)
        .send({ message: `Введены некорректные двнные: ${errMessage}` });
    case err instanceof DocumentNotFoundError:
      return res
        .status(NOT_FOUND_ERROR)
        .send({ message: "Запрашиваемый документ не найден" });
    case err instanceof CastError:
      return res.status(BAD_DATA_ERROR).send({ message: "Некорректный Id" });
    default:
      return res.status(DEFAULT_ERROR).send({
        message: `Что-то пошло не так... ${err.name}: ${err.message}`,
      });
  }
};

module.exports = { handlerErrors };
