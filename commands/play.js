const Discord = require('discord.js');
const ytdl = require('ytdl-core');

module.exports = {
	name: 'play',
	description: 'Test Purposes',
	execute(message, args) {
		let ytLink = args[0];
		if(!ytLink.length) return message.channel.send(`> **ئێ کاکە جارێ لینکەکە دانێ دە با نەبێ بە ناخۆشیمان**`)
		if (message.channel.type === 'dm') return;

		const voiceChannel = message.member.voice.channel;

		if (!voiceChannel) {
			return message.reply('> **ئەوە تۆ تەواوی؟ جارێ بڕۆ ڤۆیس ئینجا من بانگکە کورە**');
		}

		voiceChannel.join().then(connection => {
			const stream = ytdl(`${ytLink}`, { filter: 'audioonly' });
			const dispatcher = connection.play(stream);

			dispatcher.on('finish', () => voiceChannel.leave());
		});
		message.channel.send(`> **START PLAYING: ** ${ytLink}`);
	},
};