module.exports = {
	name: 'hug',
	description: 'Test Purposes',
	execute(message, args) {
        const taggedPerson = message.mentions.members.first();
        if(!args[0]) {
            message.channel.send(`ئەوەی ئەتەوێ باوەشی پیاکەی تاگیکە هەناسە!`);
        } else {
            message.channel.send(`!${message.author} **باوەشێکی گەرمی کرد بە** ${taggedPerson} :qpepeHeart:`)
        }
	},
};