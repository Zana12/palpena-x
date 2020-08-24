module.exports = {
	name: 'hug',
	description: 'Test Purposes',
	execute(message, args) {
        const taggedPerson = message.mentions.members.first();
        if (!args.length) return message.channel.send(`ئەوەی ئەتەوێ باوەشی پیاکەی تاگیکە هەناسە!`);
        message.channel.send(`!${message.author} **باوەشێکی گەرمی کرد بە** ${taggedPerson} <:hug:747519226243448904>`);
	},
};