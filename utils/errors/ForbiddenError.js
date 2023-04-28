module.exports = class ForbiddenError extends Error {
  constructor() {
    super();
    this.message = "Недостаточно прав для этого действия";
    this.statusCode = 403;
  }
};
