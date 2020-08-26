const moment = require('moment');
const config = require('./../config.json');
const dateFormat = require('dateformat');
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
				"image": {
					"url": `${member.user.displayAvatarURL()}?size=2048`
				},
				"description" : `**Profile:** ${member.user.tag} \n**Status**: ${status} \n**ID:** ${member.id} \n**Created:** ${moment.utc(member.user.createdAt).format("dddd, MMMM Do YYYY")} \n **Joined:** ${joineddate} \n **${joined}** day(s) ago \n**Roles:** <@&${member._roles.join('> <@&')}>`
			};
			return message.channel.send({embed});	
		}
		function executeServerInfos(){
			const date = new Date();
			dateFormat(date, 'dddd, mmmm dS, yyyy, h:MM:ss TT');
			const millis = new Date().getTime() - message.guild.createdAt.getTime();
			const days = millis / 1000 / 60 / 60 / 24;

			let owner = message.guild.owner.user.tag;
			let ownerID = message.guild.owner.id;
			let memberCountServer = message.guild.memberCount;
			let serverRegion = message.guild.region;
			let serverCreated = dateFormat(message.guild.createdAt);
			let rolesSize = message.guild.roles.size;
			let daysSinceCR = days.toFixed(0);
			let ServerName = message.guild.name;
			let serverIcon = message.guild.iconURL();

			const embed = {
				"color": 0x2091ff,
				"timestamp": new Date(),
				"footer": {
					"icon_url": config.logo,
					"text": config.bot_name
				},
				"thumbnail": {
					"url": serverIcon
				},
				"title" : "__**Server Information and Statistics**__",
				"author": {
					"name": member.user.tag,
					"icon_url": member.user.displayAvatarURL()
				},
				"description" : `**Server Name:** ${ServerName} \n**Server Owner:** ${owner} \n**Server Owner ID:** ${ownerID} \n**Server Members:** ${memberCountServer} members \n**Server Roles:** ${rolesSize} roles \n**Server Region:** ${serverRegion} \n**Server Created on:** ${serverCreated} \n**Days Since Creation:** ${daysSinceCR}`
			};
			return message.channel.send({embed});
		}
		switch(args[0]) {
            case "userinfo":
				retrieveUserInfo();
			break;
			case "server":
				executeServerInfos();
			break;
		}
	},
};
