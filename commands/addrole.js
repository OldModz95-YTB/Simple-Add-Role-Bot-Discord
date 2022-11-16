const { MessageEmbed } = require('discord.js')
const variables = require(`../variables/variables.json`)
const roleID = variables.RoleID

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
        name: 'addrole',
        description: 'Ajouter un role à un membre',
        permission: true,
        options:
        [
            {
                name: 'user',
                description: 'Utilisateur à qui ajouter le role',
                type: 'USER',
                required: true
            },
            {
                name: 'roles',
                description: 'Role à ajouter',
                type: 'STRING',
                choices:
                        [
                            {name: 'Membre', value: '976101171339092038'},
                            {name: 'Custom', value: '923800545494466631'},
                        ],
                required: true
            }
        ],
        
    })

//?========================
//* Utilisateur autorisé.
WhiteList = variables.WhiteList

//?=========================
//* INTERACTION CREATE
client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	if (interaction.commandName === 'addrole')
    {
        if(WhiteList.includes(interaction.user.id))
        {
            const user = interaction.options.getUser('user');
            const roles = interaction.options.getString('roles');

                var guild = client.guilds.cache.get(variables.guildID)
                const member = await guild.members.fetch(user.id)

                    const role = await guild.roles.fetch(roles)
                    try
                    {
                        member.roles.add(role)

                        let embed_add = new MessageEmbed()
                        .setTitle("**Role Ajouter**")
                        .setColor("00FF00")
                        .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
                        .setDescription(`Le role ${role} est ajouter au membre ${member}`)
                        .setTimestamp()
                        .setFooter({text: `Developped By OldModz95 | Proposed By ProtonDev`})

                        return interaction.reply({
                            embeds: [embed_add],
                            ephemeral: false
                        });
                    }
                        
                    catch
                    {
                        return interaction.reply({ephemeral: true, content: `:x: **ERREUR LORS DE L'AJOUT DU ROLE !!!`});
                    }

        }
        else// SI L'UTILISATEUR NA PAS SONT ID AJOUTER A LA WHITELIST
        {
            return interaction.reply({ephemeral: true, content: `Désoler, mais tu ne peux pas faire cela.`});
        }
        
	}//*End interaction commands
});
//* END INTERACTION CREATE
//?=========================

}//* End module.exports





/*
SUB_COMMAND sets the option to be a subcommand
SUB_COMMAND_GROUP sets the option to be a subcommand group
STRING sets the option to require a string value
INTEGER sets the option to require an integer value
NUMBER sets the option to require a decimal (also known as a floating point) value
BOOLEAN sets the option to require a boolean value
USER sets the option to require a user or snowflake as value
CHANNEL sets the option to require a channel or snowflake as value
ROLE sets the option to require a role or snowflake as value
MENTIONABLE sets the option to require a user, role or snowflake as value
#Choices




const string = interaction.options.getString('input');
const integer = interaction.options.getInteger('int');
const number = interaction.options.getNumber('num');
const boolean = interaction.options.getBoolean('choice');
const user = interaction.options.getUser('target');
const member = interaction.options.getMember('target');
const channel = interaction.options.getChannel('destination');
const role = interaction.options.getRole('muted');
const mentionable = interaction.options.getMentionable('mentionable');
*/
