module.exports = {
    
    name: "eval",
    aliases: [],
    description: "acar",
    permissions: ["OWNER"],
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
      if (!args[0]) return message.channel.send(`not content.`);
    let code = args.join(' ');

    function clean(text) {
      if (typeof text !== 'string') text = require('util').inspect(text, { depth: 0 })
      text = text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203))
      return text;
    };
    try { 
      var evaled = clean(await eval(code));
      if(evaled.match(new RegExp(`${client.token}`, 'g')));
      message.channel.send(`\`\`\`js
${evaled}\`\`\``);
    } catch(err) { message.channel.send(`\`\`\`js
${err}\`\`\``) };
    }
};