const { MessageEmbed } = require('discord.js')
const variables = require(`../variables/variables.json`)

module.exports = (client) => {

    const guildID = variables.guildID
    const guild = client.guilds.cache.get(guildID)
    let commands

    if(guild)
    {
        commands = guild.commands
    }
    else
    {
        commands = client.application.commands
    }


    commands.create({
        name: 'help',
        description: 'Fonctionnalité du bot',
        permission: true,
        
    })

//?=========================
//* INTERACTION CREATE
client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	if (interaction.commandName === 'help')
    {
        let embed_add = new MessageEmbed()
                .setTitle("**Titre**")
                .setColor("RANDOM")
                .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
                .setDescription(`Description de ton help`)
                .setTimestamp()
                .setFooter({text: `footer`})

                interaction.reply({
                    embeds: [embed_add],
                    ephemeral: false
                });
	}//*End interaction commands
});
//* END INTERACTION CREATE
//?=========================

}//* End module.exports
