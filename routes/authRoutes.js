const express = require("express");
const { register, login } = require("../controllers/authController");
const limiter = require("../middleware/rateLimiter");
const router = express.Router();

router.post("/register", register);
router.post("/login", limiter, login);

module.exports = router;
