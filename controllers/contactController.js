const {
  createContact,
  getContacts,
  updateContact,
  deleteContact,
} = require("../models/contactModel");

const {
  importCSV,
  importExcel,
  processContacts,
} = require("../controllers/fileController");

const addContact = (req, res) => {
  const { name, email, phone, address, timezone } = req.body;
  const userId = req.user.userId;

  createContact(name, email, phone, address, timezone, userId, (err) => {
    if (err) return res.status(500).send("Error adding contact");
    res.status(201).send("Contact added successfully");
  });
};

const getAllContacts = (req, res) => {
  const userId = req.user.userId;
  getContacts(userId, (err, contacts) => {
    if (err) return res.status(500).send("Error retrieving contacts");
    res.json(contacts);
  });
};

const updateContactDetails = (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  updateContact(id, updates, (err) => {
    if (err) return res.status(500).send("Error updating contact");
    res.send("Contact updated successfully");
  });
};

const deleteContactDetails = (req, res) => {
  const { id } = req.params;

  deleteContact(id, (err) => {
    if (err) return res.status(500).send("Error deleting contact");
    res.send("Contact deleted successfully");
  });
};

const importContacts = (req, res) => {
  const { file } = req;
  const filePath = file.path;

  const extension = file.originalname.split(".").pop().toLowerCase();

  if (extension === "csv") {
    importCSV(filePath, (contacts) => {
      processContacts(contacts);
      res.status(200).send("Contacts imported successfully from CSV");
    });
  } else if (extension === "xlsx" || extension === "xls") {
    importExcel(filePath, (contacts) => {
      processContacts(contacts);
      res.status(200).send("Contacts imported successfully from Excel");
    });
  } else {
    res
      .status(400)
      .send("Invalid file type. Only CSV and Excel files are supported.");
  }
};

module.exports = {
  addContact,
  getAllContacts,
  updateContactDetails,
  deleteContactDetails,
  importContacts,
};
