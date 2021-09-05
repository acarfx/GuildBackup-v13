const { MessageEmbed } = require('discord.js');
module.exports = {
    
    name: "yardım",
    aliases: ["help","yardim"],
    description: "",
    permissions: [],
    category: [],
    active: true,

    /**
    * @param {Client} client 
    */
   
    onLoad: function (client) {

    },

    /**
    * @param {Client} client 
    * @param {Message} message 
    * @param {Array<String>} args 
    */

    onRequest: async function (client, message, args) {
        let embed = new MessageEmbed().setFooter(sistem.embed.altbaşlık ? sistem.embed.altbaşlık : message.guild.name, sistem.embed.icon ? sistem.embed.icon : message.guild.iconURL({dynamic: true})).setAuthor(sistem.embed.başlık ? sistem.embed.başlık : message.guild.name, sistem.embed.icon ? sistem.embed.icon : message.guild.iconURL({dynamic: true})).setColor(sistem.embed.renk ? sistem.embed.renk : "RANDOM")
        let komutlar = client.commands.filter(x => !x.permissions.includes("OWNER") && x.name != module.exports.name).map(x => global.sistem.prefix[0] + `\`${x.name} | ${x.description}\``).join("\n")
        message.channel.send({embeds: [embed.setDescription(`\`[ ${global.sistem.prefix.map(x => x).join(" | ")} ]\` (**${global.sistem.prefix.length}**) prefix mevcut.\n\n${komutlar}`)]})
    }
};