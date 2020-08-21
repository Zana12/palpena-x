const DB = require("mongoose");

const guildSchema = DB.Schema({
    _id: DB.Schema.Types.ObjectId,
    guildID: String,
    guildName: String
});
module.exports = DB.model('Guild', guildSchema, 'guilds');