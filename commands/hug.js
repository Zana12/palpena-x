module.exports = {
	name: 'hug',
	description: 'Test Purposes',
	execute(message, args) {
        const taggedPerson = message.mentions.members.first();

        if(!args[1]) {
            message.channel.send(`ئەوەی ئەتەوێ باوەشی پیاکەی تاگیکە هەناسە!`);
        } else {
            message.channel.send(`!${taggedPerson.displayName} باوەشێکی گەرمی کرد بە ${message.author.username}`)
        }
	},
};