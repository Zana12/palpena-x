module.exports = {
	name: 'kiss',
	description: 'Test Purposes',
	execute(message, args) {
        const taggedPerson = message.mentions.members.first();
        if(!args[1]) {
            message.channel.send(`ئەوەی ئەتەوێ ماچی بکەی تاگی بکە!`);
        } else {
            message.channel.send(`!${message.author} **ماچی گوپی** ${taggedPerson} <:hug:747519226243448904>`)
        }
	},
};