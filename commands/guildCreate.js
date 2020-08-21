const DB = require("mongoose");
const Guild = require("guild");
module.exports = async (client, guild) => {
    guild = new Guild({
        _id: DB.Types.ObjectId(),
        guildID: guild.id,
        guildName: guild.name
    });

    guild.save()
    .then(result => console.log(result))
    .catch(err => console.error(err));

    console.log("I have joined a new Server!");
}