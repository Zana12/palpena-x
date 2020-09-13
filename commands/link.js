module.exports = {
	name: 'link',
	description: 'executing the server command',
	aliases: ['server', 'serverlink', 'l'],
	cooldown: 10,
	execute(message, args) {
        message.delete(message.author);
		message.reply(`,\n**PALPENA SERVER LINK:** \n > https://discord.gg/nCaP6TZ`);
	},
};