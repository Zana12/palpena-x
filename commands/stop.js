module.exports = {
	name: 'stopy',
	description: 'Test Purposes',
	execute(message, args) {
		if (message.channel.type === 'dm') return;
		const voiceChannel = message.member.voice.channel;
        voiceChannel.leave()
		message.channel.send(`> **Ok Sir! I will leave :( Bye!**`);
	},
};