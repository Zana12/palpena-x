const Discord = require('discord.js');
const config = require('./config.json');
const client = new Discord.Client();
const moment = require('moment');


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
	const channel = guild.guild.channels.cache.find(ch => ch.name === 'bot-guild-status');
	const embed = new Discord.MessageEmbed()
		.setDescription(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members! \nNow I am going to serve ${client.guilds.size} servers`)
		.setColor("#14ff67");
	channel.channel.send(embed);
});

client.on("guildDelete", guild => {
	console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
	const channel = guild.guild.channels.cache.find(ch => ch.name === 'bot-guild-status');
	const embed = new Discord.MessageEmbed()
		.setDescription(`I have been removed from: ${guild.name} (id: ${guild.id}) \nNow I am going to serve ${client.guilds.size} servers`)
		.setColor("#db1d1d");
	channel.channel.send(embed);
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
client.on('message', async message => {
  if(message.author.bot) return;
  if(!message.content.startsWith(config.prefix)) return;
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if(command === "ping") {
    const m = await message.channel.send("Ping?");
    m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
  }

});
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