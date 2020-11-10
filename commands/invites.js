const Discord = require('discord.js'),
arraySort = require('array-sort'),
table = require('table');

module.exports = {
	name: 'invites',
	description: 'Invite Table',
	async execute(message, args) {
        /*let invites = await message.guild.fetchInvites().catch(error => {
            return message.channel.send("Sorry, I don't have the proper permission to view invites");
            console.log(error);
        });
        invites = invites.array();
        arraySort(invites, 'uses', {reverse: true});

        let possibleInvites = [['User', 'Uses']];
        invites.forEach(function(invite) {
            possibleInvites.push([invite.inviter.username, invite,uses]);
        });

        const embed = new Discord.MessageEmbed()
            .setColor(0xCB5A5E)
            .setAuthor('PalpenaTeam Server Invites', 'https://palpena.com/assets/SQUAD.png')
            .addField('Leaderboard', `\`\`\`${table.table(possibleInvites)}\`\`\``);
        
        message.channel.send(embed);*/
        var user = message.mentions.members.first() || message.author;
        message.guild.fetchInvites()
        .then
        (invites =>
            {
                const userInvites = invites.array().filter(o => o.inviter.id === user.id);
                var userInviteCount = 0;
                for(var i=0; i < userInvites.length; i++)
                {
                    var invite = userInvites[i];
                    userInviteCount += invite['uses'];
                }
                    message.channel.send(`عەکە پێنەگەی مامۆسا ${user}! \n هەتیو ئەزانی هەتا ئیسە **${userInviteCount}** نەفەرو کردووە بە ناو ئەم سێرڤەرەیا!!`);
            }
        );
	},
};