const Discord = require('discord.js');
const config = require('./config.json');
const client = new Discord.Client();

const token = process.env.DISCORD_TOKEN;
const prefix = config.prefix;
const fs = require('fs');
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command)
	console.log(client.commands.set(command.name, command))
}

client.once('ready', () => {
	client.user.setActivity('Palpena X Bot', { type: 'PLAYING' })
	console.log('Ready Sir!');
});
client.on('guildMemberAdd', member => {
	const channel = member.guild.channels.cache.find(ch => ch.name === 'moderations');
	if (!channel) return;

	if (member.presence.status === 'dnd') member.presence.status = ':red_circle: DnD';
	if (member.presence.status === 'online') member.presence.status = ':green_circle: Online';
	if (member.presence.status === 'idle') member.presence.status = ':orange_circle: Idle';
	if (member.presence.status === 'offline') member.presence.status = ':white_circle: Offline';

	let x = Date.now() - member.createdAt;
	let y = Date.now() - member.guild.members.cache.get(member.id).joinedAt;
	const joined = Math.floor(y / 86400000);

	const joineddate = moment.utc(member.joinedAt).format("dddd, MMMM Do YYYY, HH:mm:ss");
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
		"description" : `**Profile:** ${member.user.tag} \n**Status**: ${status} \n**ID:** ${member.id} \n**Created:** ${moment.utc(member.user.createdAt).format("dddd, MMMM Do YYYY")} \n **Joined:** ${joineddate} \n **${joined}** day(s) ago \n**Roles:** <@&${member._roles.join('> <@&')}> \n [Avatar URL](${member.user.displayAvatarURL()})`
	};
	channel.send(`${member}, Joined to the server`, {embed});
	console.log(`${member} Joined.`);
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