module.exports = {
	name: 'say',
	description: 'executing the Say command',
	execute(message, args) {
        let text = args.join(" ");
        if (!message.member.permissions.has("ADMINISTRATOR")) {
            message.channel.send(`قەشمەری قۆمچە تۆ ناتوانی هیچ شتێکم پێ بڵێی`);
            return;
        }
        message.delete(message.author)
        message.channel.send(text);
	},
};