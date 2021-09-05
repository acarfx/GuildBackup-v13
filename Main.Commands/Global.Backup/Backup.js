const { MessageEmbed, Permissions } = require('discord.js')

module.exports = {
    
    name: "backup",
    aliases: ["yedek-al","yedekal","yedekoluştur","yedek-oluştur","yedekle","yedekyap","yedek-yap","yedek"],
    description: "Sunucunun tüm yedeklerini oluşturur.",
    permissions: ["GUILD_OWNER"],
    category: ["Yedek"],
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
        var alpha = new Array('A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',
	 	'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z', 
 	    	'0','1','2','3','4','5','6','7','8','9');
        var i;
        for (i=0;i<10;i++){
            var a = alpha[Math.floor(Math.random() * alpha.length)];
            var b = alpha[Math.floor(Math.random() * alpha.length)];
            var c = alpha[Math.floor(Math.random() * alpha.length)];
            var d = alpha[Math.floor(Math.random() * alpha.length)];
            var e = alpha[Math.floor(Math.random() * alpha.length)];
            var f = alpha[Math.floor(Math.random() * alpha.length)];
            var g = alpha[Math.floor(Math.random() * alpha.length)];
            var i = alpha[Math.floor(Math.random() * alpha.length)];
            var j = alpha[Math.floor(Math.random() * alpha.length)];
            var k = alpha[Math.floor(Math.random() * alpha.length)];
          }
        let embed = new MessageEmbed()
        .setFooter(sistem.embed.altbaşlık ? sistem.embed.altbaşlık : message.guild.name, sistem.embed.icon ? sistem.embed.icon : message.guild.iconURL({dynamic: true}))
        .setAuthor(sistem.embed.başlık ? sistem.embed.başlık : message.guild.name, sistem.embed.icon ? sistem.embed.icon : message.guild.iconURL({dynamic: true})).setColor(sistem.embed.renk ? sistem.embed.renk : "RANDOM")
        await message.channel.send(`\`📥\` Yedekleme alınmaya başlandı. Bu işlem bazen gereğinden fazla uzayabilir.`).then(msg => {
            backupSystem.create(message.guild, message.member, {
                backupID: a + b +  c + d + e + f + g + j + k,
                maxMessagePerChannel: 5,
                doNotBackup: ["emojis","bans"]
            }).then(async (x) => {
               await message.channel.send({embeds: [embed.setTitle(`Yedekleme Oluşturuldu!`).setDescription(`✅ Başarıyla istenen yedekleme (\`${x.id}\`) numaralı olarak oluşturuldu.`)]})
               .then(x => setTimeout(() => x.delete(), 8500))
               msg.delete()
               await message.react('✅')
            });
        })
    }
};