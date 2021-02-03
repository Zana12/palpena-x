const Discord = require('discord.js');
module.exports = {
	name: 'help',
	description: 'Help Center',
	async execute(message, args) {
        const embed = new Discord.MessageEmbed()
            embed.setColor('#6C5CE7')
            embed.setTitle('**Help Center**')
            embed.setDescription(`\n**b!hug [mention]** \n- hugging someone <:hug:747519226243448904> \n**b!invites [mention]** \n- show the amount of users that you have invited to the server\n**b!kiss [mention]** \n- kissing someone :kissing_heart: \n**b!live f [link]** \n- used for announcing the streams on Facebook in <#746416019274203308>\n**b!live y [link]** \n- used for announcing the streams on YouTube in <#746416019274203308>\n**b!misc userinfo [mention]** \n- used for fetching the Infos about your account and your status in the server\n**b!misc server** \n- fetching the server Information\n**b!play [link]** \n- play a song from YouTube\n**b!stop** \n- stop the current song`)
            embed.setTimestamp()
            embed.setAuthor('Palpena Team', 'https://palpena.com/dash/media/Palpena_White.png', 'https://palpena.com/')
            embed.setFooter(`Palpena Team | Requested by ${message.author.username}`, 'https://palpena.com/dash/media/Palpena_White.png');
        message.channel.send(embed);
    }
};