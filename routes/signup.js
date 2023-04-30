const router = require("express").Router();
const { signup } = require("../middlewares/request-validation");
const { createUser } = require("../controllers/users");

router.post("/", signup, createUser);

module.exports = router;
