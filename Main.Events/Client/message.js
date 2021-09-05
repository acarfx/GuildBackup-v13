const { Message, MessageEmbed } = require("discord.js");
const waitCommand = new Set();
const talentConfig = require('../../Main.Settings/talentPerms.json');

 /**
 * @param {Message} message 
 */


module.exports = (message) => {
    if (message.author.bot || !global.sistem.prefix.some(x => message.content.startsWith(x)) || !message.channel || message.channel.type == "dm") return;
    let args = message.content.substring(global.sistem.prefix.some(x => x.length)).split(" ")
    let TalentPerms = talentConfig.talentPerms.find((kom) => kom.commands.includes(args[0]));
    let commandOn = message.client.commands.get(args[0]) || message.client.aliases.get(args[0]) || TalentPerms;
    args = args.splice(1);
    let uye = message.guild.members.cache.get(message.member.id) || message.author;
    if(commandOn) {

        if(waitCommand.has(uye.id)) return message.channel.send(global.reply.coolDown);
        if(_channels.botCommands && _channels.botCommands.length && !_channels.botCommands.some(x => message.channel.id == x) && !sistem.Owner.some(id => uye.id == id) && !uye.permissions.has('ADMINISTRATOR')) return message.channel.send(`${global.reply.botCommands} ${message.guild.channels.cache.get(_channels.botCommands[0])} kanalında tekrar deneyin.`)
        if(commandOn.permissions && commandOn.permissions.length) {
            if(commandOn.permissions.includes("OWNER")) {
                if(!sistem.Owner.some(id => uye.id == id)) return message.channel.send(global.reply.noPerms);
            } else if(commandOn.permissions.includes("GUILD_OWNER")) {
                if(!sistem.Owner.some(id => uye.id == id) && !uye.permissions.has('ADMINISTRATOR') && uye.guild.ownerId != uye.id) return message.channel.send(global.reply.noPerms);
            } else {
                if(!sistem.Owner.some(id => uye.id == id) && !commandOn.permissions.some(x => uye.roles.cache.has(x)) && !uye.permissions.has('ADMINISTRATOR')) 
                return message.channel.send(`${global.reply.noPerms} ${commandOn.permissions.map(x => message.guild.roles.cache.get(x)).join(' ')} rollerine sahip olmalısın.`);
            }
        };
        
        if(!sistem.Owner.some(id => uye.id == id) && !uye.permissions.has('ADMINISTRATOR')) waitCommand.add(uye.id);

        if(TalentPerms) {
            let roleUser = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
            if (!roleUser) return message.channel.send(global.reply.notMember);
            if (TalentPerms.roles.some(role => roleUser.roles.cache.has(role))) { roleUser.roles.remove(TalentPerms.roles) } else { roleUser.roles.add(TalentPerms.roles) }
            message.react("✅")
          } else { commandOn.onRequest(message.client, message, args) };

          setTimeout(() => { waitCommand.delete(uye.id) }, 2000);
        
    }
}

module.exports.Options = {
        active: true,
        name: 'messageCreate',
}
