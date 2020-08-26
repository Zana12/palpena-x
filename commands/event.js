
const config = require('./../config.json');
const Canvas = require('canvas');
const Discord = require("discord.js");
let image = "https://res.cloudinary.com/zanakarzan/image/upload/v1598460459/jxs6s1em1jikzng9nfdp.png";
module.exports = {
	name: 'arg',
	description: 'Test Purposes',
	async execute(message, args) {
		/* let age = args[0]; // Remember arrays are 0-based!.
        let sex = args[1];
        let location = args[2];
        message.reply(`Hello ${message.author.username}, I see you're a ${age} year old ${sex} from ${location}. Wanna date?`); */
        const background = await Canvas.loadImage(image);
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

        ctx.strokeStyle = '#74037b';
        ctx.strokeRect(0, 0, canvas.width, canvas.height);

        // informations
        ctx.font = 'bold 22px sans-serif';
        ctx.fillStyle = '#f34';
        ctx.fillText('Member Informations card', 100, 100);
        // Close Information
        ctx.beginPath();
        ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.clip();

        const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
        ctx.drawImage(avatar, 25, 25, 200, 200);

        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'member-information-image.png');
		message.channel.send(attachment)
	},
};