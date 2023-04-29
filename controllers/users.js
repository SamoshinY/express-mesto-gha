const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const DuplicateKeyError = require("../utils/errors/DuplicateKeyError");

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, "secret-key", { expiresIn: "7d" });
      res.send({ token });
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email,
  } = req.body;
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => User.findOne(user)
      .then((userData) => res.send(userData)))
    .catch((err) => {
      if (err.code === 11000) {
        next(new DuplicateKeyError());
      }
      next();
    });
};

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch(next);
};

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch(next);
};

const updateData = (req, res, next) => {
  const userData = req.body;
  User.findByIdAndUpdate(req.user._id, userData, { new: true, runValidators: true })
    .orFail()
    .then((user) => res.send({ user }))
    .catch(next);
};

module.exports.updateProfile = (req, res, next) => {
  updateData(req, res, next);
};

module.exports.updateAvatar = (req, res, next) => {
  updateData(req, res, next);
};
