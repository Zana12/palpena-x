module.exports = {
	name: 'kiss',
	description: 'Kissing',
	execute(message, args) {
        const taggedPerson = message.mentions.members.first();
		if (!args.length) return message.channel.send(`ئەوەی ئەتەوێ باوەشی پیاکەی تاگیکە هەناسە!`);
		message.delete(message.author);
        message.channel.send(`${message.author} \n **ماچێکی گووپی ** \n <a:machygup:747801955212066866> ${taggedPerson} کرد`);
	},
};
