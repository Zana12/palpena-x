module.exports = {
	name: 'info', // Name of your command that you retrieve in the index.js, line 21
	description: 'Get PUBG MOBILE Weapons Statics',
	args: true,
	execute(message, args) {
		if (!args.length) return message.channel.send(":warning: **Usage:**  `-info <weapons name>`");
		var weapons = require('./../weapons.json');
		// Loop Information about the weapons
		function loopStatics() {
			var i = "";
			for (i in typeweapons) {
				name = typeweapons[i].name;
				thumbnail = typeweapons[i].thumbnail;
				ammoType = typeweapons[i].ammoType;
				initialBulletSpeed = typeweapons[i].initialBulletSpeed;
				damagePerSec = typeweapons[i].damagePerSec;
				zeroingRanges = typeweapons[i].zeroingRanges;
				ammoPerClip = typeweapons[i].ammoPerClip;
				burstSize = typeweapons[i].burstSize;
				timeBetweenShots = typeweapons[i].timeBetweenShots;
				firingModes = typeweapons[i].firingModes;
			}
		}
		// Embed Style
		function embedTemplate() {
			const embed = {
				"title": "**Weapon Name: **" + name,
				"description": "The following are the known statistics for "+ name +" weapon in PLAYERUKNOWN's BATTLEGROUNDS..",
				"color": 0x2091ff,
				"timestamp": new Date(),
				"footer": {
				  "icon_url": weapons.pubg_logo,
				  "text": weapons.title
				},
				"thumbnail": {
				  "url": thumbnail
				},
				"author": {
				  "name": weapons.title,
				  "icon_url": weapons.pubg_logo
				},
				"fields": [
				  {
					"name": "**Ammo Type**",
					"value": ammoType,
					"inline": true
				  },
				  {
					"name": "**Initial Bullet Speed**",
					"value": initialBulletSpeed,
					"inline": true
				  },
				  {
					"name": "**Damage Per Sec**",
					"value": damagePerSec,
					"inline": true
				  },
				  {
					"name": "**Zeroing Ranges**",
					"value": zeroingRanges,
					"inline": true
				  },
				  {
					"name": "**Ammo Per Clip**",
					"value": ammoPerClip,
					"inline": true
				  },
				  {
					"name": "**Burst Size**",
					"value": burstSize,
					"inline": true
				  },
				  {
					"name": "**Time Between Shots**",
					"value": timeBetweenShots,
					"inline": true
				  },
				  {
					"name": "**Firing Modes**",
					"value": firingModes,
					"inline": true
				  },
				]
			};
			return message.channel.send({ embed });
		}
		// Retrieve all Data
		function retrieveData() {
			loopStatics();
			embedTemplate();
		}
		switch(args[0]) {
            case "scar-l":
				var typeweapons = weapons.scarl;
				retrieveData();
			case "akm":
				var typeweapons = weapons.akm;
				retrieveData();
			break;
		}
	}
};