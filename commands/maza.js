module.exports = {
	name: 'mazakrdn',
	description: 'Maza',
	execute(message, args) {
        const taggedPerson = message.mentions.members.first();
		if (!args.length) return message.channel.send(`ئەو کەسە تاگ بکە کە ئەتەوێ مەزەی بکەی`);
		message.delete(message.author);
        message.channel.send(`${message.author} \n **هەستا بە مەزەکردنی** \n <:txa:746460815414132788> ${taggedPerson}`);
	},
};
