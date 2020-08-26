const Discord = require('discord.js');
const ytdl = require('ytdl-core');

module.exports = {
	name: 'play',
	description: 'Test Purposes',
	async execute(message, args) {
        if (message.channel.type === 'dm') return;

		const voiceChannel = message.member.voice.channel;

		if (!voiceChannel) {
			return message.reply('please join a voice channel first!');
		}

		voiceChannel.join().then(connection => {
			const stream = ytdl('https://youtu.be/QfqFNVBjZ_U', { filter: 'audioonly' });
			const dispatcher = connection.play(stream);

			dispatcher.on('finish', () => voiceChannel.leave());
		});
	},
};