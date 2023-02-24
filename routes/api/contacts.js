const express = require("express");
const router = express.Router();

const asyncHandler = require("../../tools/asyncHandler");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");

const {
  addContactValidation,
  changeContactValidation,
} = require("../../middlewares/validation");

router.get("/", async (req, res) => {
  const contacts = await asyncHandler(listContacts());

  return res
    .status(200)
    .json({ contacts, message: "Success, contacts downloaded" });
});

router.get("/:id", async (req, res) => {
  const contactById = await asyncHandler(getContactById(req.params.id));

  return contactById
    ? res.status(200).json({ contactById, message: "Success, contact found" })
    : res.status(404).json({ message: "Not found" });
});

router.post("/", addContactValidation, async (req, res) => {
  const newContact = await asyncHandler(addContact(req.body));

  return res
    .status(201)
    .json({ newContact, message: "Success, contact added" });
});

router.delete("/:id", async (req, res) => {
  const removedContact = await asyncHandler(removeContact(req.params.id));

  return removedContact
    ? res
        .status(200)
        .json({ removedContact, message: "Success, contact removed" })
    : res.status(404).json({ message: "Not found" });
});

router.put("/:id", changeContactValidation, async (req, res) => {
  const updatedContact = await asyncHandler(
    updateContact(req.params.id, req.body)
  );

  return updatedContact
    ? res
        .status(200)
        .json({ updatedContact, message: "Success, contact updated" })
    : res.status(404).json({ message: "Not found" });
});

module.exports = router;
