const express = require("express");
const multer = require("multer");
const {
  addContact,
  getAllContacts,
  updateContactDetails,
  deleteContactDetails,
  importContacts,
} = require("../controllers/contactController");
const authenticateToken = require("../middleware/authMiddleware");
const router = express.Router();

const upload = multer({ dest: "uploads/" });

router.post("/contacts", authenticateToken, addContact);
router.get("/contacts", authenticateToken, getAllContacts);
router.put("/contacts/:id", authenticateToken, updateContactDetails);
router.delete("/contacts/:id", authenticateToken, deleteContactDetails);

router.post(
  "/import",
  authenticateToken,
  upload.single("file"),
  importContacts
);

module.exports = router;
