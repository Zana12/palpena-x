const Discord = require('discord.js');
const config = require('./config.json');
const client = new Discord.Client();
const moment = require('moment');
const invites = {};
const wait = require('util').promisify(setTimeout);
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

client.once('ready', async () => {
	client.user.setActivity(`Palpena Server`, { type: 'WATCHING' })
	await wait(1000);

	// Load all invites for all guilds and save them to the cache.
	client.guilds.cache.forEach(g => {
	  g.fetchInvites().then(guildInvites => {
		invites[g.id] = guildInvites;
	  });
	});
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
	let x = Date.now() - member.createdAt;
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
		"description" : `**Profile:** ${member.user.tag} \n**ID:** ${member.id} \n**Created:** ${moment.utc(member.user.createdAt).format("dddd, MMMM Do YYYY")}`
	};
	const role = member.guild.roles.cache.find(role => role.name === 'Member');
	member.roles.add(role);
	if(member.roles.add(role)) {
		let roleStatus_X = ":white_check_mark:";
		channel.send(`${member}, Joined to the server \n Role Status = ${roleStatus_X}`, {embed});
	} else {
		let roleStatus_Y = ":warning:";
		channel.send(`${member}, Joined to the server \n Role Status = ${roleStatus_Y}`, {embed});
	}	
	channel.send(`${member}, Joined to the server`, {embed});
	console.log(`${member.user.tag} Joined.`);

	member.guild.fetchInvites().then(guildInvites => {
		// This is the *existing* invites for the guild.
		const ei = invites[member.guild.id];
		// Update the cached invites for the guild.
		invites[member.guild.id] = guildInvites;
		// Look through the invites, find the one for which the uses went up.
		const invite = guildInvites.find(i => ei.get(i.code).uses < i.uses);
		// This is just to simplify the message being sent below (inviter doesn't have a tag property)
		const inviter = client.users.cache.get(invite.inviter.id);
		// Get the log channel (change to your liking)
		const logChannel = member.guild.channels.cache.find(channel => channel.name === "member-invites");
		// A real basic message with the information we need. 
		logChannel.send(`${member.user.tag} joined using invite code \`${invite.code}\` from \`${inviter.tag}\`. Invite was used \`${invite.uses}\` times since its creation.`);
	  });
});
client.on('guildMemberRemove', member => {
	const channel = member.guild.channels.cache.find(ch => ch.name === 'member-left');
	if (!channel) return;
	let x = Date.now() - member.createdAt;
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
		"description" : `**Profile:** ${member.user.tag} \n**ID:** ${member.id} \n**Created:** ${moment.utc(member.user.createdAt).format("dddd, MMMM Do YYYY")}`
	};
	channel.send(`${member}, left the guild.`, {embed});
	console.log(`${member} left the guild.`);
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