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
        .setDMPermission(false)
        .setDefaultMemberPermissions(),

    /// Command Execution
	async execute(interaction) {
		let content = await interaction.options.getString('announcement')
        let channel = await interaction.options.getChannel('channel')

        await channel.send(content)
        await interaction.reply('Announcement Sent✨')
	},
};

