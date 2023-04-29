module.exports = class NotFoundError extends Error {
  constructor() {
    super();
    this.message = "Страница не найдена";
    this.statusCode = 404;
  }
};
