module.exports = {
	name: 'live',
	description: 'executing the server command',
	cooldown: 10,
	execute(message, args) {
        let streamerName = args[0];
        let description = args[1].shift().join(' ');
        message.channel.send(`This ${streamerName} is ${description}.`);
	},
};