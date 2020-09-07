const Discord = require('discord.js');
const config = require('./config.json');
const client = new Discord.Client();
const moment = require('moment');
const ytdl = require('ytdl-core');

const token = process.env.DISCORD_TOKEN;
const prefix = config.prefix;
const fs = require('fs');
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command)
	console.log(`${file} loaded`);
}

client.once('ready', () => {
	client.user.setActivity(`Palpena Server`, { type: 'WATCHING' })
	console.log('Ready Sir!');
});

client.on("guildCreate", guild => {
	console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
});

client.on("guildDelete", guild => {
	console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
});

client.on('guildMemberAdd', member => {
	const channel = member.guild.channels.cache.find(ch => ch.name === 'members-data');
	if (!channel) return;

	if (member.presence.status === 'dnd') member.presence.status = ':red_circle: DnD';
	if (member.presence.status === 'online') member.presence.status = ':green_circle: Online';
	if (member.presence.status === 'idle') member.presence.status = ':orange_circle: Idle';
	if (member.presence.status === 'offline') member.presence.status = ':white_circle: Offline';

	let x = Date.now() - member.createdAt;
	let status = member.presence.status;
	const embed = {
		"color": 0x2091ff,
		"timestamp": new Date(),
		"footer": {
			"icon_url": config.logo,
			"text": config.bot_name
		},
		"thumbnail": {
			"url": member.user.displayAvatarURL()
		},
		"author": {
			"name": member.user.tag,
			"icon_url": member.user.displayAvatarURL()
		},
		"image": {
			"url": `${member.user.displayAvatarURL()}?size=2048`
		},
		"description" : `**Profile:** ${member.user.tag} \n**Status**: ${status} \n**ID:** ${member.id} \n**Created:** ${moment.utc(member.user.createdAt).format("dddd, MMMM Do YYYY")}`
	};
	const role = member.guild.roles.cache.find(role => role.name === 'Members');
	member.roles.add(role);
	if(member.roles.add(role)) {
		let roleStatus_X = ":white_check_mark:";
		channel.send(`${member}, Joined to the server \n Role Status = ${roleStatus_X}`, {embed});
	} else {
		let roleStatus_Y = ":warning:";
		channel.send(`${member}, Joined to the server \n Role Status = ${roleStatus_Y}`, {embed});
	}	
	console.log(`${member.user.tag} Joined.`);
});
client.on("message", async message => {
	if (message.author.bot) return;
	if (!message.content.startsWith(prefix)) return;
  
	const serverQueue = queue.get(message.guild.id);
  
	if (message.content.startsWith(`${prefix}play`)) {
	  execute(message, serverQueue);
	  return;
	} else if (message.content.startsWith(`${prefix}skip`)) {
	  skip(message, serverQueue);
	  return;
	} else if (message.content.startsWith(`${prefix}stop`)) {
	  stop(message, serverQueue);
	  return;
	} else {
	  message.channel.send("You need to enter a valid command!");
	}
});
async function execute(message, serverQueue) {
	const args = message.content.split(" ");
  
	const voiceChannel = message.member.voice.channel;
	if (!voiceChannel)
	  return message.channel.send(
		"You need to be in a voice channel to play music!"
	  );
	const permissions = voiceChannel.permissionsFor(message.client.user);
	if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
	  return message.channel.send(
		"I need the permissions to join and speak in your voice channel!"
	  );
	}
  
	const songInfo = await ytdl.getInfo(args[1]);
	const song = {
	  title: songInfo.title,
	  url: songInfo.video_url
	};
  
	if (!serverQueue) {
	  const queueContruct = {
		textChannel: message.channel,
		voiceChannel: voiceChannel,
		connection: null,
		songs: [],
		volume: 5,
		playing: true
	  };
  
	  queue.set(message.guild.id, queueContruct);
  
	  queueContruct.songs.push(song);
  
	  try {
		var connection = await voiceChannel.join();
		queueContruct.connection = connection;
		play(message.guild, queueContruct.songs[0]);
	  } catch (err) {
		console.log(err);
		queue.delete(message.guild.id);
		return message.channel.send(err);
	  }
	} else {
	  serverQueue.songs.push(song);
	  return message.channel.send(`${song.title} has been added to the queue!`);
	}
}
function skip(message, serverQueue) {
	if (!message.member.voice.channel)
	  return message.channel.send(
		"You have to be in a voice channel to stop the music!"
	  );
	if (!serverQueue)
	  return message.channel.send("There is no song that I could skip!");
	serverQueue.connection.dispatcher.end();
  }
  
  function stop(message, serverQueue) {
	if (!message.member.voice.channel)
	  return message.channel.send(
		"You have to be in a voice channel to stop the music!"
	  );
	serverQueue.songs = [];
	serverQueue.connection.dispatcher.end();
  }
  
  function play(guild, song) {
	const serverQueue = queue.get(guild.id);
	if (!song) {
	  serverQueue.voiceChannel.leave();
	  queue.delete(guild.id);
	  return;
	}
  
	const dispatcher = serverQueue.connection
	  .play(ytdl(song.url))
	  .on("finish", () => {
		serverQueue.songs.shift();
		play(guild, serverQueue.songs[0]);
	  })
	  .on("error", error => console.error(error));
	dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
	serverQueue.textChannel.send(`Start playing: **${song.title}**`);
}
client.on('message', async message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;
	const args = message.content.slice(prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();
	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
	if (!command) return;

	try {
		command.execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});

client.login(token);