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
        ctx.fillStyle = '#ffffff';
        ctx.fillText('Member Informations card', canvas.width / 2.9, canvas.height / 6.7);

        ctx.font = '22px sans-serif';ctx.fillStyle = '#ffffff';
        ctx.fillText('Profile:', canvas.width / 2.9, canvas.height / 3.4);
        ctx.fillText(`${member.displayName}`, canvas.width / 2.1, canvas.height / 3.4);

        ctx.font = '22px sans-serif';ctx.fillStyle = '#ffffff';
        ctx.fillText('Status:', canvas.width / 2.9, canvas.height / 2.6);
        ctx.fillText(`${status}`, canvas.width / 2.1, canvas.height / 2.6);

        ctx.font = '22px sans-serif';ctx.fillStyle = '#ffffff';
        ctx.fillText('ID:', canvas.width / 2.9, canvas.height / 2.03);
        ctx.fillText(`${member.id}`, canvas.width / 2.5, canvas.height / 2.03);

        ctx.font = '22px sans-serif';ctx.fillStyle = '#ffffff';
        ctx.fillText('Created:', canvas.width / 2.9, canvas.height / 1.65);
        ctx.fillText(`${moment.utc(member.user.createdAt).format("dddd, MMMM Do YYYY")}`, canvas.width / 2.1, canvas.height / 1.65);

        ctx.font = '22px sans-serif';ctx.fillStyle = '#ffffff';
        ctx.fillText('Joined:', canvas.width / 29, canvas.height / 1.02);
        ctx.fillText(`${joineddate} ${joined} day(s) ago`, canvas.width / 7, canvas.height / 1.02);

        // Close Information
        ctx.beginPath();
        ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.clip();

        const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
        ctx.drawImage(avatar, 25, 25, 200, 200);

        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'member-information-image.png');
		message.channel.send(`> **ROLES:** <@&${member._roles.join('> <@&')}> \n > **ID:** ${member.id}`, attachment)
	},
};