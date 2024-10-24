const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createUser, findUserByEmail } = require("../models/userModel");
const Joi = require("joi");

const register = async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(1).required().messages({
      "string.empty": "Name is required",
      "any.required": "Name is required",
    }),
    email: Joi.string().email().required().messages({
      "string.email": "Invalid email format",
      "any.required": "Email is required",
    }),
    password: Joi.string().min(6).required().messages({
      "string.min": "Password must be at least 6 characters long",
      "any.required": "Password is required",
    }),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const { name, email, password } = req.body;

  findUserByEmail(email, async (err, user) => {
    if (err) return res.status(500).send("Error checking user");
    if (user) return res.status(400).send("User already exists");

    const hashedPassword = await bcrypt.hash(password, 10);

    createUser(name, email, hashedPassword, (err) => {
      if (err) return res.status(500).send("Error registering user");
      res.status(201).send("User registered successfully");
    });
  });
};

const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send("Email and password are required");
  }

  findUserByEmail(email, async (err, user) => {
    if (err || !user) return res.status(400).send("Email not found");

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(401).send("Invalid password");

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    res.json({ token });
  });
};

module.exports = { register, login };
