module.exports = {
	name: 'live',
	description: 'executing the server command',
	async execute(message, args) {
        let scType = args[0];
        let livelink = args[1];
        // if (!args.length) return message.channel.send(`ئەو لینکە دانێ بەهەشتی، یاپراخ لە ئاگاداری دایناوە جوان سەیریکە <:nababa:762646412470386719>`);
        const channel = message.guild.channels.cache.find(ch => ch.name === 'palpena-stream');

        if(scType === "f") {
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
          channel.send({embed});
        } else if (scType === "y") {
          const embed = {
            "title": "Palpena Team is Live Now!",
            "description": `<:YouTube:760546309282594856> We are Streaming now on YouTube make sure to show some Support to our Team! \n \n \n **LINK:** **[Click here](${livelink})**`,
            "url": "https://discordapp.com",
            "color": 4360181,
            "thumbnail": {
              "url": "https://res.cloudinary.com/zanakarzan/image/upload/v1599319328/tcfw3dc97522bb7lmylp.png"
            },
            "author": {
              "name": "Palpena Team",
              "icon_url": "https://palpena.com/dash/media/Palpena_White.png"
            }
          };
          channel.send({embed});
        }
        message.reply("I have added the Link to <#746416019274203308> Successfully! :white_check_mark:")
	},
};