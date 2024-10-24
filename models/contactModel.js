const db = require("../db/database");

const createContact = (
  name,
  email,
  phone,
  address,
  timezone,
  userId,
  callback
) => {
  const query = `INSERT INTO contacts (name, email, phone, address, timezone, user_id) VALUES (?, ?, ?, ?, ?, ?)`;
  db.run(query, [name, email, phone, address, timezone, userId], callback);
};

const getContacts = (userId, callback) => {
  const query = `SELECT * FROM contacts WHERE user_id = ? AND deleted_at IS NULL`;
  db.all(query, [userId], callback);
};

const updateContact = (id, updates, callback) => {
  const { name, email, phone, address, timezone } = updates;
  const query = `
    UPDATE contacts
    SET name = ?, email = ?, phone = ?, address = ?, timezone = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ? AND deleted_at IS NULL
  `;
  db.run(query, [name, email, phone, address, timezone, id], callback);
};

const deleteContact = (id, callback) => {
  const query = `UPDATE contacts SET deleted_at = CURRENT_TIMESTAMP WHERE id = ?`;
  db.run(query, [id], callback);
};

module.exports = { createContact, getContacts, updateContact, deleteContact };
