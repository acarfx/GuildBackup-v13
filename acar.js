const { Intents } = require('discord.js')
const { acar } = require('./Global.Client');

const client = global.client = new acar({ 
    fetchAllMembers: true,
    intents: [ 
        32767 
    ]
});

client.fetchCommands()
client.fetchEvents()

client.login(sistem.token).catch(err => { console.log("[TOKEN]: ARIZALI.")})
