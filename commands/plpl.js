const Discord = require('discord.js');
const fetch = require('node-fetch');
module.exports = {
	name: 'plpl',
	description: 'PLPL Stats',
	async execute(message, args) {
        const file = await fetch('https://palpenateam.com/api?leaderboard').then(response => response.json());
        let sup = "";
        let rank = 1;
        file.forEach((pro) => {
            sup += `\`#${rank++}\`  | **${pro[8]}** | \`PTS:\` **${pro[20]}**\n`;
        });
        const embed = new Discord.MessageEmbed()
            embed.setColor('#6C5CE7')
            embed.setTitle('**Palpena League Standing**')
            embed.setThumbnail('https://palpenateam.com/dash/media/palpena_league_logo.png')
            embed.setDescription(`${sup}\n <:palpena_league:803668112821846026> - [PLPL Overall Standing](https://palpenateam.com/palpena-league)`)
            embed.setTimestamp()
            embed.setImage('https://palpenateam.com/dash/media/Palpena_Legaue_Stand.png')
            embed.setAuthor('Palpena Team', 'https://palpenateam.com/dash/media/Palpena_White.png', 'https://palpenateam.com/')
            embed.setFooter(`Palpena Team | Requested by ${message.author.username}`, 'https://palpenateam.com/dash/media/Palpena_White.png');
        message.channel.send(embed);
    }
};