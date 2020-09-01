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
	client.user.setActivity(`${prefix} | Palpena Bot`, { type: 'PLAYING' })
	console.log('Ready Sir!');
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
/* client.on("messageDelete", async (messageDelete) => {
  await Discord.Util.delayFor(900);
  const fetchedLogs = await messageDelete.guild.fetchAuditLogs({
    limit: 6,
    type: 'MESSAGE_DELETE'
  }).catch(() => ({
    entries: []
  }));

  const auditEntry = fetchedLogs.entries.find(a =>
    a.target.id === messageDelete.author.id &&
    a.extra.channel.id === messageDelete.channel.id &&
    Date.now() - a.createdTimestamp < 20000
  );
  const executor = auditEntry ? auditEntry.executor.tag : 'Unknown';
  const countingChannel = messageDelete.guild.channels.find(x => x.name === "palpena-counting");
  const DeleteEmbed = new Discord.MessageEmbed()
    .setTitle("DELETED MESSAGE")
    .setColor("#fc3c3c")
    .addField("Author", messageDelete.author.tag, true)
    .addField("Deleted By", executor, true)
    .addField("Channel", messageDelete.countingChannel, true)
    .addField("Message", messageDelete.content || "None")
    .setFooter(`Message ID: ${messageDelete.id} | Author ID: ${messageDelete.author.id}`);

  const DeleteChannel = messageDelete.guild.channels.find(x => x.name === "moderations");
  DeleteChannel.send(DeleteEmbed);
}); */
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
client.on('message', ({channel, content, member}) => {
	// Only do this for the counting channel of course
  // If you want to simply make this work for all channels called 'counting', you
  // could use this line:
  // if (client.channels.cache.filter(c => c.name === 'counting').keyArray().includes(channel.id))
  if (channel.id === '743416987023048734') {
    // You can ignore all bot messages like this
    if (member.user.bot) return
	// If the message is the current count + 1...
	count = 0
    if (Number(content) === count + 1) {
      // ...increase the count
      count++
      // Remove any existing timeout to count
      if (timeout) client.clearTimeout(timeout)
      // Add a new timeout
      timeout = client.setTimeout(
        // This will make the bot count and log all errors
        () => channel.send(++count).catch(console.error),
        // after 30 seconds
        30000
      )
    // If the message wasn't sent by the bot...
    } else if (member.id !== client.user.id) {
      // ...send a message because the person stuffed up the counting (and log all errors)
      channel.send(`${member} messed up!`).catch(console.error)
      // Reset the count
      count = 0
      // Reset any existing timeout because the bot has counted so it doesn't need to
      // count again
      if (timeout) client.clearTimeout(timeout)
    }
  }
});
client.login(token);