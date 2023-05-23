const fs = require("fs").promises;
const path = require("path");
const shortid = require("shortid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

console.log("Contacts file path:", contactsPath);

function listContacts() {
  fs.readFile(contactsPath)
    .then((data) => console.log(data.toString()))
    .catch((err) => console.error(err.message));
}

function getContactById(contactId) {
  fs.readFile(contactsPath)
    .then((data) => {
      const contacts = JSON.parse(data);
      const contact = contacts.find((contact) => contact.id === contactId);
      if (contact) {
        console.log(contact);
        return;
      }
      console.log("Contact not found");
    })
    .catch((err) => {
      console.log(err.message);
    });
}

function removeContact(contactId) {
  fs.readFile(contactsPath)
    .then((data) => {
      const contacts = JSON.parse(data);
      console.log(contacts);
      const contact = contacts.find((contact) => contact.id === contactId);
      if (contact) {
        const filteredContacts = contacts.filter((contact) => contact.id !== contactId);
        const updatedData = JSON.stringify(filteredContacts);
        fs.writeFile(contactsPath, updatedData)
          .then(() => {
            console.log(`removeContact: Contact with ID ${contactId} removed`);
          })
          .catch((err) => {
            console.log(err.message);
          });
      }
      console.log("removeContact: Contact not found");
    })
    .catch((err) => {
      console.log(err.message);
    });
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath).then((data) => {
    const contacts = JSON.parse(data);
    const id = shortid();
    const sameId = contacts.find((contact) => contact.id === id);
    const sameName = contacts.find((contact) => contact.name === name);

    if (!sameId && !sameName) {
      const newContact = { name, email, phone, id };
      console.log(newContact);
      contacts.push(newContact);
      const updatedData = JSON.stringify(contacts);
      fs.writeFile(contactsPath, updatedData)
        .then(() => {
          console.log(`addContact: Contact with ID ${id} added`);
          return;
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
    console.log("addContact: contact with this id already exists");
    return;
  });
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
