const contacts = require("./contacts");

const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

console.log(contacts);

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const data = await contacts.listContacts();
      console.table(data);
      break;
    case "get":
      if (!id) {
        console.log("There is no id");
      } else {
        const result = await contacts.getContactById(id);
        console.log(result);
      }

      break;
    case "add":
      if (name && email && phone) {
        const newContact = await contacts.addContact(name, email, phone);
        console.log(newContact);
      }
      break;

    case "remove":
      if (!id) {
        console.log("There is no id");
      } else {
        const result = await contacts.removeContact(id);
        console.log(result);
      }
  }
}

// invokeAction({ action: "list" });
// invokeAction({ action: "get", id: "AeHIrLTr6JkxGE6SN-0Rw" });
// invokeAction({ action: "remove", id: "AeHIrLTr6JkxGE6SN-0Rw" });

// invokeAction({
//   action: "add",
//   name: "Anna",
//   email: "anna@gmail.com",
//   phone: "099-000-01-11",
// });

invokeAction(argv);
console.log(argv);
console.log(process.argv);
