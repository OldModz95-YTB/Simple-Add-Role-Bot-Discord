const Discord = require('discord.js');

const client = new Discord.Client({
    intents: [Discord.Intents.FLAGS.GUILDS],
    partials: ['MESSAGE', 'USER', 'REACTION'] 
});


client.queue = new Discord.Collection()
const variables = require(`./variables/variables.json`)

//!===================
const addrole = require('./commands/addrole');
const help = require('./commands/help');
//!===================


client.once('ready', () => {
    console.log('Je suis en ligne !')

        client.user.setStatus("dnd");
        client.user.setActivity('ProtonDev', { type: 'WATCHING' });


//*==================
addrole(client)
help(client)
//!=====================================================================
})

client.on('voiceStateUpdate', (old, New) => {
    if (old.id !== client.user.id) return
    if (old.channelID && !New.channelID) client.queue.delete(old.guild.id)
})

client.login(variables.token)