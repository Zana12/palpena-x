const config = require('./../config.json');
const Canvas = require('canvas');
const Discord = require("discord.js");
const moment = require('moment');
let image = "https://res.cloudinary.com/zanakarzan/image/upload/v1598032825/snqrcytz6xq4voqrxbbm.png";
module.exports = {
	name: 'canva',
	description: 'Test Purposes',
	async execute(message, args) {
        let member = message.mentions.members.first() || message.guild.members.cache.get(userArgs[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === userArgs.slice(0).join(" ") || x.user.username === userArgs[0]) || message.member;
        const canvas = Canvas.createCanvas(700, 346);
        const ctx = canvas.getContext('2d');
		if (member.presence.status === 'dnd') member.presence.status = ':red_circle: DnD';
		if (member.presence.status === 'online') member.presence.status = ':green_circle: Online';
		if (member.presence.status === 'idle') member.presence.status = ':orange_circle: Idle';
		if (member.presence.status === 'offline') member.presence.status = ':white_circle: Offline';

		let x = Date.now() - member.createdAt;
		let y = Date.now() - message.guild.members.cache.get(member.id).joinedAt;
		const joined = Math.floor(y / 86400000);

		const joineddate = moment.utc(member.joinedAt).format("dddd, MMMM Do YYYY, HH:mm:ss");
        let status = member.presence.status;
        
        const background = await Canvas.loadImage(image);
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

        ctx.strokeStyle = '#74037b';
        ctx.strokeRect(0, 0, canvas.width, canvas.height);

        // informations
        ctx.font = 'bold 22px sans-serif';
        ctx.fillText('Member Informations card', c.width / 2.9, c.height / 6.7);

        ctx.font = '22px sans-serif';
        ctx.fillText('Profile:', c.width / 2.9, c.height / 3.4);
        ctx.fillText(`${member.displayName}`, c.width / 2.1, c.height / 3.4);

        ctx.font = '22px sans-serif';
        ctx.fillText('Status:', c.width / 2.9, c.height / 2.6);
        ctx.fillText(`${status}`, c.width / 2.1, c.height / 2.6);

        ctx.font = '22px sans-serif';
        ctx.fillText('ID:', c.width / 2.9, c.height / 2.03);
        ctx.fillText(`${member.id}`, c.width / 2.5, c.height / 2.03);

        ctx.font = '22px sans-serif';
        ctx.fillText('Created:', c.width / 2.9, c.height / 1.65);
        ctx.fillText(`${moment.utc(member.user.createdAt).format("dddd, MMMM Do YYYY")}`, c.width / 2.1, c.height / 1.65);

        ctx.font = '22px sans-serif';
        ctx.fillText('Joined:', c.width / 22, c.height / 1.02);
        ctx.fillText(`${joineddate} ${joined} day(s) ago`, c.width / 6, c.height / 1.02);

        // Close Information
        ctx.beginPath();
        ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.clip();

        const avatar = await Canvas.loadImage(member.user.displayAvatarURL());
        ctx.drawImage(avatar, 25, 25, 200, 200);

        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'member-information-image.png');
		message.channel.send(`> **ROLES:** <@&${member._roles.join('> <@&')}> \n > **ID:** ${member.id}`, attachment)
	},
};