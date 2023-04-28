module.exports = class DuplicateKeyError extends Error {
  constructor() {
    super();
    this.message = "Пользователь с таким адресом уже существует";
    this.statusCode = 409;
  }
};
