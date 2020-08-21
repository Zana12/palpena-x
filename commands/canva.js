const config = require('./../config.json');
const Canvas = require('canvas');
const image = require('./../palpena.png');
module.exports = {
	name: 'canva',
	description: 'Test Purposes',
	async execute(message, args) {
        let member = message.mentions.members.first() || message.guild.members.cache.get(userArgs[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === userArgs.slice(0).join(" ") || x.user.username === userArgs[0]) || message.member;
        const canvas = Canvas.createCanvas(700, 250);
        const ctx = canvas.getContext('2d');

        const background = await Canvas.loadImage(image);
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

        ctx.strokeStyle = '#74037b';
        ctx.strokeRect(0, 0, canvas.width, canvas.height);

        // Select the font size and type from one of the natively available fonts
        ctx.font = '60px sans-serif';
        // Select the style that will be used to fill the text in
        ctx.fillStyle = '#ffffff';
        // Actually fill the text with a solid color
        ctx.fillText(member.displayName, canvas.width / 2.5, canvas.height / 1.8);

        ctx.beginPath();
        ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.clip();

        const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
        ctx.drawImage(avatar, 25, 25, 200, 200);

        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');
		message.channel.send(attachment)
	},
};