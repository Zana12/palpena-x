module.exports = {
	name: 'ping',
	description: 'Miscellaneous',
	execute(message, args) {
		message.channel.send("Pong!")
	},
};