const { SlashCommandBuilder } = require('@discordjs/builders')
const fs = require('fs');
let log = fs.createWriteStream('logs/lyra_log.log') 
let err = fs.createWriteStream('lyra_err.log') 

/// EDITS POST FROM BOT ///
module.exports = {
    /// Command Params
    data: new SlashCommandBuilder()
        .setName('edit')
        .setDescription('Edit Lyra\'s Announcement')
        .addStringOption(option => 
            option.setName('link')
                .setDescription('Link of Announcement')
                .setRequired(true))
        .addStringOption(option => 
            option.setName('announcement')
                .setDescription('New Announcement Content')
                .setRequired(true))
        .setDMPermission(false),

    /// Command Execution
    async execute(interaction) {
        link = await interaction.options.getString('link')
        content = await interaction.options.getString('announcement')
        
        // Grab guild id, channel id , and message id from link
        let [guild, channel, message] = link.slice(29).split('/')

        // Try to edit the message using guild, channel, message args.. send error if it doesn't work
        try {
            guild = await interaction.client.guilds.cache.get(guild)
            channel = await guild.channels.cache.get(channel)
            message = await channel.messages.fetch(message)

            await message.edit(content)
            await interaction.reply('Announcement Edited✨')
        } catch (error){
            err.write("edit.js error:" + String(error) + "\n")
            await interaction.reply('Please enter the link of a valid Lyra announcement')
            await interaction.client.users.cache.get('814847668706082837').send(String(error))
        } 
    }
}