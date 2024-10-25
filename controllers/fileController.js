const csv = require("csv-parser");
const fs = require("fs");
const ExcelJS = require("exceljs");
const { createContact } = require("../models/contactModel");

const importCSV = (filePath, callback) => {
  const contacts = [];
  fs.createReadStream(filePath)
    .pipe(csv())
    .on("data", (row) => contacts.push(row))
    .on("end", () => callback(contacts));
};

const importExcel = (filePath, callback) => {
  const workbook = new ExcelJS.Workbook();
  workbook.xlsx
    .readFile(filePath)
    .then(() => {
      const sheet = workbook.getWorksheet(1);
      sheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
        contacts.push({
          name: row.getCell(1).value,
          email: row.getCell(2).value,
          phone: row.getCell(3).value,
          address: row.getCell(4).value,
          timezone: row.getCell(5).value,
        });
      });
      callback(contacts);
    })
    .catch((err) => console.error("Error reading Excel file:", err));
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
