const fs = require("fs/promises");
const path = require("path");
const { uid } = require("uid");

const contactsPath = path.join(__dirname, "contacts.json");

const readContacts = async () => {
  return await fs.readFile(contactsPath, "utf-8");
};

const listContacts = async () => {
  return JSON.parse(await readContacts());
};

const getContactById = async (id) => {
  const contacts = await listContacts();
  const [contactById] = contacts.filter((item) => item.id === id);
  return contactById;
};

const addContact = async (body) => {
  const contacts = await listContacts();
  const { name, email, phone } = body;
  const newContact = { name, email, phone, id: uid(2) };
  contacts.push(newContact);
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

const removeContact = async (id) => {
  const contacts = await listContacts();
  const [removedContact] = contacts.filter((item) => item.id === id);
  if (removedContact) {
    const newContacts = contacts.filter((item) => item.id !== id);
    fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2));
  }
  return removedContact;
};

const updateContact = async (id, body) => {
  const contacts = await listContacts();
  const [updatedContact] = contacts.filter((item) => item.id === id);

  if (updatedContact) {
    const { name, email, phone } = body;

    if (name) updatedContact.name = name;
    if (email) updatedContact.email = email;
    if (phone) updatedContact.phone = phone;

    const updatedContactIndex = contacts.indexOf(updatedContact);
    contacts[updatedContactIndex] = updatedContact;

    fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  }

  return updatedContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
