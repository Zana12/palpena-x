module.exports = {
	name: 'say',
	description: 'executing the Say command',
	async execute(message, args) {
        let msg = args[0].slice(1).join(" ");
        message.delete(message.author);
		channel.send(msg);
	},
};