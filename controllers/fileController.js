const csv = require("csv-parser");
const fs = require("fs");
const xlsx = require("xlsx");
const { createContact } = require("../models/contactModel");

const importCSV = (filePath, callback) => {
  const contacts = [];
  fs.createReadStream(filePath)
    .pipe(csv())
    .on("data", (row) => contacts.push(row))
    .on("end", () => callback(contacts));
};

const importExcel = (filePath, callback) => {
  const workbook = xlsx.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const contacts = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
  callback(contacts);
};

const processContacts = (contacts) => {
  contacts.forEach((contact) => {
    const { name, email, phone, address, timezone } = contact;
    createContact(name, email, phone, address, timezone, (err) => {
      if (err) {
        console.error("Error adding contact:", err);
      } else {
        console.log("Contact added:", name);
      }
    });
  });
};

module.exports = {
  importCSV,
  importExcel,
  processContacts,
};
