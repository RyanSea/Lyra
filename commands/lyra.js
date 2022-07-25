const { SlashCommandBuilder } = require('@discordjs/builders');

/// MAKES AN ANNOUNCEMENT POST FROM BOT ///
module.exports = {
    /// Command Params
	data: new SlashCommandBuilder()
		.setName('lyra')
		.setDescription('Lyra Announcement')
        .addChannelOption(option => 
            option.setName('channel')
                .setDescription('Destination of Announcement')
                .setRequired(true))
        .addStringOption(option => 
            option.setName('announcement')
                .setDescription('Announcement Content')
                .setRequired(true))
        .addAttachmentOption(option => 
                option.setName('image')
                    .setDescription('Announcement Image'))
        .setDMPermission(false),

    /// Command Execution
	async execute(interaction) {
		let announcement = await interaction.options.getString('announcement')
        let channel = await interaction.options.getChannel('channel')
        let image = await interaction.options.getAttachment('image')
        
        if (image) {
            console.log(image)
            await channel.send({content: announcement, files: [image]})
        } else {
            await channel.send(announcement)
        }
        
        await interaction.reply('Announcement Sent✨')
	},
};

