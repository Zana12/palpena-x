
const config = require('./../config.json');
const Canvas = require('canvas');
const Discord = require("discord.js");
let image = "https://res.cloudinary.com/zanakarzan/image/upload/v1598460459/jxs6s1em1jikzng9nfdp.png";
module.exports = {
	name: 'arg',
	description: 'Test Purposes',
	async execute(message, args) {
		let eventName = args[0]; // Remember arrays are 0-based!.
        const canvas = Canvas.createCanvas(1342, 755);
        const ctx = canvas.getContext('2d');
        const background = await Canvas.loadImage(image);
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

        ctx.strokeStyle = '#74037b';
        ctx.strokeRect(0, 0, canvas.width, canvas.height);

        // informations
        ctx.font = 'bold 50px sans-serif';
        ctx.fillStyle = '#f34';
        ctx.fillText(eventName, 605, 377.5);
        // Close Information
        ctx.beginPath();
        ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.clip();

        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'member-information-image.png');
		message.channel.send(attachment)
	},
};