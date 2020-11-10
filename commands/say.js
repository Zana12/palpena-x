module.exports = {
	name: 'say',
	description: 'executing the Say command',
	execute(message, args) {
        let text = args.join(" ");
        message.delete(message.author)
        message.channel.send(text);
	},
};