const Discord = require('discord.js');
const config = require('../config.json');
module.exports = {
	name: 'ban',
	description: 'Ban users from your server',
	async execute(message, args) {
    let banned = message.mentions.users.first() || message.users.resolve(args[0]);
    let reason = args.slice(1).join(" ");
    if (!args.length) return message.channel.send(`:warning: **Usage:** \`${config.prefix}ban <mention> <reason>\``);
    if (message.author === banned) {
      let sanctionyourselfembed = new Discord.MessageEmbed()
        .setDescription(`Why sanction yourself? why?? lemme know?!`)
        .setColor("#2C2F33");
      message.channel.send(sanctionyourselfembed);
  
      return;
    }
  
    if (!reason) {
      let noreasonembed = new Discord.MessageEmbed()
        .setDescription(`Enter a reason`)
        .setColor("#2C2F33");
      message.channel.send(noreasonembed);
  
      return;
    }
  
    if (!message.member.permissions.has("ADMINISTRATOR")) {
      let nopermsembed = new Discord.MessageEmbed()
        .setDescription(
          "You are still just a kid, don't use this command! :smirk:"
        )
        .setColor("#2C2F33");
      message.channel.send(nopermsembed);
  
      return;
    }
  
    if (!message.guild.me.permissions.has("ADMINISTRATOR")) {
      let botnopermsembed = new Discord.MessageEmbed()
        .setDescription(
          "I'm not in that level to ban the King of the Server! :cry:"
        )
        .setColor("#2C2F33");
      message.channel.send(botnopermsembed);
  
      return;
    }
  
    message.guild.members.ban(banned, { reason: reason });
  
    let successfullyembed = new Discord.MessageEmbed()
      .setTitle(`${banned.tag} go and get the ball! :volleyball:`)
      .setColor("#2C2F33");
  
    message.channel.send(successfullyembed);
	},
};