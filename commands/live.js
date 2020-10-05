module.exports = {
	name: 'live',
	description: 'executing the server command',
	async execute(message, args) {
        let Streamer = args[0]; // Remember arrays are 0-based!.
        let live = args[1];
		message.channel.send(`${eventName}, ${live}`);
	},
};