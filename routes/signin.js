const router = require("express").Router();
const { signin } = require("../middlewares/request-validation");
const { login } = require("../controllers/users");

router.post("/", signin, login);

module.exports = router;
