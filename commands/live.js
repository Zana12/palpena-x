module.exports = {
	name: 'live',
	description: 'executing the server command',
	async execute(message, args) {
		let eventName = args[0]; // Remember arrays are 0-based!.
		message.channel.send(`${eventName}`);
	},
};