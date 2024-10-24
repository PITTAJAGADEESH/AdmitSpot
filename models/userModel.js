const db = require("../db/database");

const createUser = (name, email, hashedPassword, callback) => {
  const query = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;
  db.run(query, [name, email, hashedPassword], callback);
};

const findUserByEmail = (email, callback) => {
  const query = `SELECT * FROM users WHERE email = ?`;
  db.get(query, [email], callback);
};

module.exports = { createUser, findUserByEmail };
