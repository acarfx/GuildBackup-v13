const {MessageEmbed, Permissions, Collection} = require('discord.js')
var fs = require("fs");

module.exports = {
    
    name: "yedeklerim",
    aliases: ["yedeklistesi","backups","backuplistesi","yedek-listesi","yedekler"],
    description: "Oluşturduğunuz yedekleri listeler.",
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
        .setFooter(sistem.embed.altbaşlık ? sistem.embed.altbaşlık : message.guild.name, sistem.embed.icon ? sistem.embed.icon : message.guild.iconURL({dynamic: true}))
        .setColor(sistem.embed.renk ? sistem.embed.renk : "RANDOM")
        let yedekler = new Collection()
        let yedekvar = new Collection()
            await fs.readdirSync(`${__dirname}/../../Main.Backups`).forEach(async (a) => {
                a = a.split(".")[0]
                let dosya = JSON.parse(fs.readFileSync(`./Main.Backups/` + a + ".json", "utf-8"))
                if(dosya.memberID != message.member.id) return;
                yedekler.set(dosya.id, {
                    Code: dosya.id,
                    Isim: dosya.name,
                    Tarih: tarihsel(dosya.createdTimestamp),
                })
                yedekvar.set(message.member.id, {
                    yarram: true,
                    acar: true
                })
              });
            
              message.channel.send({embeds : [embed.setDescription(`Aşağıda bulunan yedekler sizin oluşturduğunuz yedeklerdir.
\`${sistem.prefix[0]}kur <#Yedek Kodu>\` komutu ile yedek kurulumu yapabilirsiniz.

**❯ Yedeklemeler (\`${yedekler.size}\`)**\n ${yedekvar.get(message.member.id) ? yedekler.sort((a, b) => b.Tarih - a.Tarih).map(value =>   `\`•\` **${value.Isim}** / __${value.Tarih}__ (\`${value.Code}\`)`).join("\n") : ':x: Yedek bulunamadı.'}`)]})
               
    }
};