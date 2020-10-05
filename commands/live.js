module.exports = {
	name: 'live',
	description: 'executing the server command',
	async execute(message, args) {
        let livelink = args[0];
        if (!args.length) return message.channel.send(`ئەو لینکە دانێ بەهەشتی، یاپراخ لە ئاگاداری دایناوە جوان سەیریکە <:nababa:7334231424748748801>`);
        const channel = message.guild.channels.cache.find(ch => ch.name === 'palpena-stream');
        const embed = {
            "title": "Palpena Team is Live Now!",
            "description": `<:facebook:732173439183355904> We are Streaming now on Facebook make sure to show some Support to our Team! \n \n \n **LINK:** **[Click here](${livelink})**`,
            "url": "https://discordapp.com",
            "color": 4360181,
            "thumbnail": {
              "url": "https://res.cloudinary.com/zanakarzan/image/upload/v1599319328/tcfw3dc97522bb7lmylp.png"
            },
            "author": {
              "name": "Palpena Team",
              "icon_url": "https://palpena.com/assets/SQUAD.png"
            }
          };
        message.delete(message.author);
		channel.send(`<@&73290492030654880>,`,{embed});
	},
};