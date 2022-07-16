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

        console.log([name, avatar ? avatar.proxyURL : avatar])

        if (name) {
            try {
                await interaction.client.user.setUsername(name)

                // If no avatar finish interaction
                if (!avatar) {
                    await interaction.reply('Name Changed✨')
                    return
                } 
            } catch (error) {
                console.log('Failed to change name error:', error)
                interaction.reply('You\'re changing the username too fast!')
                await interaction.client.users.cache.get('814847668706082837').send(String(error))
                console.log('foo')
                return
            }
            console.log('bar')
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
                console.log("Failed to change avatar:", error)
                await interaction.reply('You\'re changing the avatar too fast!')
                await interaction.client.users.cache.get('814847668706082837').send(String(error))
            }
        } else if (avatar && !avatar.contentType.startsWith('image')) {
            await interaction.reply('Please upload a valid image')
        }
	}

}
