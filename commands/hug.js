module.exports = {
	name: 'hug',
	description: 'Test Purposes',
	execute(message, args) {
        const taggedPerson = message.mentions.members.first();
		if (!args.length) return message.channel.send(`ئەوەی ئەتەوێ باوەشی پیاکەی تاگیکە هەناسە!`);
		message.delete(message.author);
        message.channel.send(`${message.author} \n **باوەشێکی گەرم و نەرمی کرد بە** \n ${taggedPerson} <:hug:747519226243448904>`);
	},
};