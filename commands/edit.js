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
        .addAttachmentOption(option => 
            option.setName('image')
                .setDescription('Announcement Image'))
        .setDMPermission(false),

    /// Command Execution
    async execute(interaction) {
        let link = await interaction.options.getString('link')
        let announcement = await interaction.options.getString('announcement')
        let image = await interaction.options.getAttachment('image')
        
        // Grab guild id, channel id , and message id from link
        let [guild, channel, message] = link.slice(29).split('/')

        // Try to edit the message using guild, channel, message args.. send error if it doesn't work
        try {
            guild = await interaction.client.guilds.cache.get(guild)
            channel = await guild.channels.cache.get(channel)
            message = await channel.messages.fetch(message)

            if (image) {
                await channel.send({content: announcement, files: [image]})
            } else {
                await channel.send(announcement)
            }
            await interaction.reply('Announcement Edited✨')

        } catch (error){
            err.write("edit.js error:" + String(error) + "\n")
            await interaction.reply('Please enter the link of a valid Lyra announcement')
            await interaction.client.users.cache.get('814847668706082837').send(String(error))
        } 
    }
}