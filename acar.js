const { Intents } = require('discord.js')
const { acar } = require('./Global.Client');

const client = global.client = new acar({ 
    fetchAllMembers: true,
    intents: [ 
        Intents.FLAGS.GUILDS, 
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_INTEGRATIONS 
    ]
});

client.fetchCommands()
client.fetchEvents()

client.login(sistem.token).catch(err => { console.log("[TOKEN]: ARIZALI.")})