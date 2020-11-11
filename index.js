const Discord = require('discord.js');
const config = require('./config.json');
const client = new Discord.Client();
const moment = require('moment');
const wait = require('util').promisify(setTimeout);
const token = process.env.DISCORD_TOKEN;
const prefix = config.prefix;
const fs = require('fs');
const guildInvites = new Map();

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command)
	console.log(`${file} loaded`);
}
client.on('inviteCreate', async invite => guildInvites.set(invite.guild.id, await invite.guild.fetchInvites()));
client.once('ready', async () => {
	client.user.setActivity(`Palpena Server`, { type: 'WATCHING' })
	await wait(1000);

	// Load all invites for all guilds and save them to the cache.
	const logChannel = client.guild.channels.cache.find(channel => channel.name === "member-invites");
	function sendDetails(value) {
		return logChannel.send(value).catch(err => console.log(err));
	}
	client.guilds.cache.forEach(guild => {
		guild.fetchInvites()
			.then(invites => sendDetails(guildInvites.set(guild.id, invites)))
			.catch(err => console.log(err));
		
	});

	console.log('Ready Sir!');

});

client.on("guildCreate", guild => {
	console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
});

client.on("guildDelete", guild => {
	console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
});

client.on('guildMemberAdd', async member => {
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
	channel.send(`${member}, Joined the server`, {embed});
	console.log(`${member.user.tag} Joined.`);
	// const logChannel = member.guild.channels.cache.find(channel => channel.name === "member-invites");
	// Fetch Invites
	const cachedInvites = guildInvites.get(member.guild.id);
	const newInvites = await member.guild.fetchInvites();
	guildInvites.set(member.guild.id, newInvites);
	try {
		const usedInvite = newInvites.find(inv => cachedInvites.get(inv.code).uses < inv.uses);
		const embedInv = new Discord.MessageEmbed()
			.setDescription(`${member.user.tag} is the ${member.guild.memberCount} to join.\nJoined using **${usedInvite.inviter.tag}**\nNumber of uses: **__${usedInvite.uses}__**`)
			.setTimestamp()
			.setThumbnail(`${member.user.displayAvatarURL()}?size=2048`);
		const logChannel = member.guild.channels.cache.find(channel => channel.name === "member-invites");
		logChannel.send(embedInv).catch(err => console.log(err));
	} catch(err) {
		console.log(err);
	}
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
