const contacts = require("./contacts");
const argv = require("yargs").argv;

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      contacts
        .listContacts()
        .then((data) => {
          if (data.contacts !== null) {
            console.log(data.message);
            console.table(data.contacts);
          } else {
            console.log(data.message);
          }
        })
        .catch((err) => {
          console.error(err.message);
        });
      break;

    case "get":
      contacts
        .getContactById(id)
        .then((data) => {
          if (data.contact !== null) {
            console.log(data.message);
            console.table(data.contact);
          } else {
            console.log(data.message);
          }
        })
        .catch((err) => {
          console.error(err.message);
        });
      break;

    case "add":
      contacts
        .addContact(name, email, phone)
        .then((data) => {
          if (data.contacts !== null) {
            console.log(data.message);
            console.table(data.contacts);
          } else {
            console.log(data.message);
          }
        })
        .catch((err) => {
          console.error(err.message);
        });
      break;

    case "remove":
      contacts.removeContact(id).then((data) => {
        if (data.contact !== null) {
          console.log(data.message);
          console.table(data.contact);
        } else {
          console.log(data.message);
        }
      });
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
