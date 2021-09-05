const {MessageEmbed, Permissions, Collection, MessageButton, MessageActionRow } = require('discord.js')
var fs = require("fs");
const table = require('table')
module.exports = {
    
    name: "kur",
    aliases: ["yedekkur","yedek-kur","backupload","load","backup-load","yedeklerkur"],
    description: "Oluşturulan yedekleri yükler.",
    permissions: ["GUILD_OWNER"],
    category: ["BACKUP"],
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
        let embed = new MessageEmbed()
        .setAuthor(sistem.embed.başlık ? sistem.embed.başlık : message.guild.name, sistem.embed.icon ? sistem.embed.icon : message.guild.iconURL({dynamic: true}))
        .setColor(sistem.embed.renk ? sistem.embed.renk : "RANDOM")
        let yarraYedik = args[0] 
        if(!yarraYedik) return message.channel.send(global.reply.notBackupCode).then(x => { setTimeout(() => { x.delete() }, 7500)});
        const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('onayla')
                .setLabel('Eminim!')
                .setEmoji("853774597702418453")
                .setStyle(1),
            new MessageButton()
                .setCustomId('iptal')
                .setLabel('Emin Değilim!')
                .setEmoji("867867702864642068")
                .setStyle('DANGER'),
        );
        backupSystem.fetch(yarraYedik).then(async () => {
            message.channel.send({content: ":warning: Yedekleme kurma işlemi yaparken sunucu ayarlarınız, rolleriniz ve kanallarınız kaldırılacaktır bundan emin misiniz?", components: [row]}).then(x => {
                const filter = i => i.user.id === message.member.id;
                const collector = message.channel.createMessageComponentCollector({ filter, time: 15000 });
                collector.on('collect', async i => {
                    if (i.customId === 'onayla') {
                        await i.update({ content: `:white_check_mark: Yedek (\`${yarraYedik}\`) kodundaki kurulum başlıyor.`, components: [] });
                        backupSystem.load(yarraYedik, message.guild, {
                            clearGuildBeforeRestore: true
                            
                        }).then(() => {
                            backupSystem.remove(yarraYedik)
                        })
                    }
                    if(i.customId === 'iptal') {
                        await i.update({ content: 'İşlem istek üzerine iptal edildi.', components: [] }).then(a => setTimeout(() => {x.delete()},7500))
                    }
                });
                collector.on('end', collected => {
                    x.delete().catch(x => {})
                });
            });

        })
        .catch(err => {
            message.channel.send(global.reply.outBackupCode).then(x => { setTimeout(() => { x.delete() }, 7500)});
        })
    }
};