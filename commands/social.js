const Discord = require('discord.js');
module.exports = {
	name: 'social',
	description: 'Social Networks',
	async execute(message, args) {
        message.channel.send(`**Palpena Social Media:**\n> __Website__: <https://palpenateam.com/>\n> __Facebook__: <https://palpena.com/facebook>\n> __YouTube__: <https://palpena.com/youtube>\n> __Instagram__: <https://palpena.com/instagram>\n> __Discord__: https://discord.gg/nCaP6TZ`);
    }
};