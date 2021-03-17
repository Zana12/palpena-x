const Discord = require('discord.js');
const fetch = require('node-fetch');
module.exports = {
	name: 'profile',
	description: 'Profiles Fetch from the Web',
	async execute(message, args) {
        if (!args.length) {
            return message.channel.send(`> Mention the user first!`);
        }
        const profileargument = message.mentions.users.first().id;
        let userArray = message.content.split(" ");
        let userArgs = userArray.slice(1);
        let member = message.mentions.members.first() || message.guild.members.cache.get(userArgs[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === userArgs.slice(0).join(" ") || x.user.username === userArgs[0]) || message.member;
        const profile = await fetch('https://palpenateam.com/api?pro='+profileargument).then(response => response.json());
        const plp_name = profile[0][1];
        const plp_banner  = profile[0][2];
        const plp_profile_picture = profile[0][3];
        const plp_badge_vip = profile[0][4];
        const plp_badge_supporter = profile[0][5];
        const plp_badge_staff = profile[0][6];
        const plp_discord_role = profile[0][7];
        const plp_nickname = profile[0][8];
        const plp_about = profile[0][9];
        const plp_location = profile[0][10];
        const plp_profession = profile[0][11];
        const plp_birthday = profile[0][12];
        const plp_facebook = profile[0][13];
        const plp_instagram = profile[0][14];
        const plp_snapchat = profile[0][15];
        const plp_tiktok = profile[0][16];
        const plp_twitter = profile[0][17];
        const plp_setting_birthday = profile[0][19];
        const plp_plpl_point = profile[0][20];
        
        let plp_ph_birthday = "";
        let plp_ph_about = "";
        let plp_ph_vip = "";
        let plp_ph_supporter = "";
        let plp_ph_staff = "";
        let plp_ph_role_emoji = "";

        let plp_ph_facebook = "";
        let plp_ph_instagram = "";
        let plp_ph_tiktok = "";
        let plp_ph_snapchat = "";
        let plp_ph_twitter = "";
        if(plp_discord_role === "Owner") { plp_ph_role_emoji += "<:Owner:800388581545213962>"; } else if(plp_discord_role === "Organizer") { plp_ph_role_emoji += "<:Organizer:800388582275153951>"; } else if(plp_discord_role === "Administrator") { plp_ph_role_emoji += "<:Administrator:800388582220365882>"; } else if(plp_discord_role === "Grand_Master") { plp_ph_role_emoji += "<:Grand_Master:800388581550063646>"; } else if(plp_discord_role === "Master") { plp_ph_role_emoji += "<:Master:800388581168119850>"; } else if(plp_discord_role === "Expert") { plp_ph_role_emoji += "<:Expert:800388582211715113>"; } else if(plp_discord_role === "Epic_Guard") { plp_ph_role_emoji += "<:Epic_Guard:800388582690914314>"; } else if(plp_discord_role === "Lady_Soldier") { plp_ph_role_emoji += "<:Lady_Soldier:800388582271352842>"; } else if(plp_discord_role === "Lady_Soldier_I") { plp_ph_role_emoji += "<:Lady_Soldier_I:800388582295863316>"; } else if(plp_discord_role === "Lady_Soldier_II") { plp_ph_role_emoji += "<:Lady_Soldier_II:800388582295732334>"; } else if(plp_discord_role === "Lady_Soldier_III") { plp_ph_role_emoji += "<:Lady_Soldier_III:800388582073827329>"; } else if(plp_discord_role === "Co_Owner") { plp_ph_role_emoji += "<:Co_Owner:800388581456740392>"; } else if(plp_discord_role === "Soldier") { plp_ph_role_emoji += "<:Soldier:800388582274498580>"; } else if(plp_discord_role === "Soldier_I") { plp_ph_role_emoji += "<:Soldier_I:800388582266634240>"; } else if(plp_discord_role === "Soldier_II") { plp_ph_role_emoji += "<:Soldier_II:800388582430474240>"; } else if(plp_discord_role === "Soldier_III") { plp_ph_role_emoji += "<:Soldier_III:800388582283804702>"; } else if(plp_discord_role === "Streamer") { plp_ph_role_emoji += "<:Streamer:800388582057574411>"; } else if(plp_discord_role === "Team_Manager") { plp_ph_role_emoji += "<:Team_Manager:800388582002786305>"; } else if(plp_discord_role === "Admin") { plp_ph_role_emoji += "<:Admin:800388581793333269>"; }
        if(plp_badge_vip === "on") {plp_ph_vip = "<:vip:803612700100788264>";}if(plp_badge_supporter === "on") {plp_ph_supporter = "<:supporter:803612700071559169>";}if(plp_badge_staff === "on") {plp_ph_staff = "<:staff:803612700038004846>";}
        if(plp_about !== "") {plp_ph_about += plp_about;}
        if(plp_setting_birthday === "on") {plp_ph_birthday += plp_birthday;} else {plp_ph_birthday += "hidden";}

        if(plp_facebook !== "") {plp_ph_facebook += `<:facebook:803717707332976641> - [Facebook](${plp_facebook})`;} 
        if(plp_instagram !== "") {plp_ph_instagram += `<:instagram:803717773242138644> - [Instagram](${plp_instagram})`;}
        if(plp_tiktok !== "") {plp_ph_tiktok += `<:tiktok:803717846139928597> - [TikTok](${plp_tiktok})`;}
        if(plp_snapchat !== "") {plp_ph_snapchat += `<:snapchat:803629330303156244> - [Snapchat](${plp_snapchat})`;}
        if(plp_twitter !== "") {plp_ph_twitter += `<:twitter:803629382408863754> - [Twitter](${plp_twitter})`;}
        const embed = new Discord.MessageEmbed()
            embed.setColor('#6C5CE7')
            embed.setTitle(`**${plp_nickname}**`)
            embed.setDescription(`${plp_ph_about}\n\n**Real Name:** ${plp_name} \n**Base Role:** ${plp_ph_role_emoji} ${plp_discord_role} \n**Location:** ${plp_location} \n**Profession:** ${plp_profession} \n**Badges:** ${plp_ph_vip} ${plp_ph_supporter} ${plp_ph_staff} \n**Birthday:** ${plp_ph_birthday}\n**PLPL Points:** ${plp_plpl_point}\n\n${plp_ph_facebook} ${plp_ph_instagram} ${plp_ph_tiktok} ${plp_ph_snapchat} ${plp_ph_twitter}\n\n**__Roles:__**\n<@&${member._roles.join('> <@&')}>`)
            embed.setThumbnail(`https://palpenateam.com/dash/media/profiles/pfp/${plp_profile_picture}`)
            embed.setImage(`https://palpenateam.com/dash/media/profiles/banners/${plp_banner}`)
            embed.setTimestamp()
            embed.setAuthor('Palpena Team', 'https://palpenateam.com/dash/media/Palpena_White.png', 'https://palpenateam.com/')
            embed.setFooter(`Palpena Team | Requested by ${message.author.username}`, 'https://palpenateam.com/dash/media/Palpena_White.png');
        message.reply(embed);
    }
};