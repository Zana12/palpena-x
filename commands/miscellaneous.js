const moment = require('moment');
const config = require('./../config.json');
module.exports = {
	name: "misc",
    description: "Shows the information of a member/user",
    accessableby: "Members",
	execute(message, args) {
		if (!args.length) return message.channel.send(`:warning: **Usage:** \`${config.prefix}misc <miscellaneous aliases>\``);
		let userArray = message.content.split(" ");
		let userArgs = userArray.slice(1);
		let member = message.mentions.members.first() || message.guild.members.cache.get(userArgs[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === userArgs.slice(0).join(" ") || x.user.username === userArgs[0]) || message.member;

		if (member.presence.status === 'dnd') member.presence.status = ':red_circle: DnD';
		if (member.presence.status === 'online') member.presence.status = ':green_circle: Online';
		if (member.presence.status === 'idle') member.presence.status = ':orange_circle: Idle';
		if (member.presence.status === 'offline') member.presence.status = ':white_circle: Offline';

		let x = Date.now() - member.createdAt;
		let y = Date.now() - message.guild.members.cache.get(member.id).joinedAt;
		const joined = Math.floor(y / 86400000);

		const joineddate = moment.utc(member.joinedAt).format("dddd, MMMM Do YYYY, HH:mm:ss");
		let status = member.presence.status;
		function retrieveUserInfo() {
			const embed = {
				"color": 0x2091ff,
				"timestamp": new Date(),
				"footer": {
					"icon_url": config.logo,
					"text": config.bot_name
				},
				"thumbnail": {
					"url": member.user.displayAvatarURL()
				},
				"author": {
					"name": member.user.tag,
					"icon_url": member.user.displayAvatarURL()
				},
				"description" : `**Profile:** ${member.user.tag} \n**Status**: ${status} \n**ID:** ${member.id} \n**Created:** ${moment.utc(member.user.createdAt).format("dddd, MMMM Do YYYY")} \n **Joined:** ${joineddate} \n **${joined}** day(s) ago \n**Roles:** <@&${member._roles.join('> <@&')}> \n [Avatar URL](${member.user.displayAvatarURL()}?size=750)`
			};
			return message.channel.send({embed});	
		}
		switch(args[0]) {
            case "userinfo":
				retrieveUserInfo();
			break;
		}
	},
};
