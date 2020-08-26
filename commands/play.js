const ytdl = require('ytdl-core');
const config = require('../config.json');

module.exports = {
	name: 'play',
	description: 'Test Purposes',
	async execute(message, args) {
        if (message.channel.type === 'dm') return;
		if (!args.length) return message.channel.send(`:warning: **Usage:** \`${config.prefix}play <link>\``);

		const voiceChannel = message.member.voice.channel;

		if (!voiceChannel) {
			return message.reply('please join a voice channel first!');
        }
        
        if(args[0] === message.content) {
            voiceChannel.join().then(connection => {
                const stream = ytdl(args, { filter: 'audioonly' });
                const dispatcher = connection.play(stream);
                dispatcher.on('finish', () => voiceChannel.leave());
            });
        }

	},
};