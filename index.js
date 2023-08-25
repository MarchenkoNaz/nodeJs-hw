const contacts = require('./contacts.js')

const { Command } = require('commander');
const program = new Command();

program
	.option('-a, --action <type>', 'choose action')
	.option('-i, --id <type>', 'user id')
	.option('-n, --name <type>', 'user name')
	.option('-e, --email <type>', 'user email')
	.option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const options = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
	switch (action) {
		case 'list':
			return await contacts.listContacts().then(console.log).catch(console.error);
		case 'get':
			return await contacts.getContactById(id).then(console.log).catch(console.error);
		case 'add':
			return await contacts.addContact({ name, email, phone }).then(console.log).catch(console.error);
		case 'remove':
			return await contacts.removeContact(id).then(console.log).catch(console.error);
		default:
			console.warn('\x1B[31m Unknown action type!');
	}
}
invokeAction(options);
