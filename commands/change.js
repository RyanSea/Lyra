const { SlashCommandBuilder } = require('@discordjs/builders')


/// EDITS USERNAME / AVATAR OF BOT ///
module.exports = {
    /// Command Params
    data : new SlashCommandBuilder()
        .setName('change')
        .setDescription('Change Lyra')
        .addStringOption(option => 
            option.setName('name')
                .setDescription('Lyra\'s New Username'))
        .addAttachmentOption(option => 
            option.setName('avatar')
                .setDescription('Lyra\'s New Avatar'))
        .setDMPermission(false),

    /// Command Execution
    async execute(interaction) {
        let name = await interaction.options.getString('name')
        let avatar = await interaction.options.getAttachment('avatar')

        if (name) {
            try {
                await interaction.client.user.setUsername(name)

                // If no avatar finish interaction
                if (!avatar) {
                    await interaction.reply('Name Changed✨')
                    return
                } 
            } catch (error) {
                await interaction.client.users.cache.get('814847668706082837').send(String(error))

                interaction.reply('You\'re changing the username too fast!')
                return
            }
        }
        
        if (avatar && avatar.contentType.startsWith('image')) {
            try {
                await interaction.client.user.setAvatar(avatar.proxyURL)

                if (name) {
                    await interaction.reply('Name & Avatar Changed✨')
                } else {
                    await interaction.reply('Avatar Changed✨')
                }
                
            } catch (error) {
                await interaction.client.users.cache.get('814847668706082837').send(String(error))

                await interaction.reply('You\'re changing the avatar too fast!')
            }
        } else if (avatar && !avatar.contentType.startsWith('image')) {
            await interaction.reply('Please upload a valid image')
        }
	}

}
