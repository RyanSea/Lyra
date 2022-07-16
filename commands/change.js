const { SlashCommandBuilder } = require('@discordjs/builders')
fs = require('fs');
let log = fs.createWriteStream('logs/lyra_log.log') 
let err = fs.createWriteStream('lyra_err.log') 

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

        log.write(`${name} | ${avatar ? avatar.proxyURL : avatar}\n`)

        if (name) {
            try {
                await interaction.client.user.setUsername(name)

                // If no avatar finish interaction
                if (!avatar) {
                    await interaction.reply('Name Changed✨')
                    return
                } 
            } catch (error) {
                err.write('Failed to change name error: ' + String(error) + "\n")
                interaction.reply('You\'re changing the username too fast!')
                await interaction.client.users.cache.get('814847668706082837').send(String(error))
                log.write("foo \n")
                return
            }
            log.write('bar\n')
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
                err.write('Failed to change name error: ' + String(error) + "\n")
                await interaction.reply('You\'re changing the avatar too fast!')
                await interaction.client.users.cache.get('814847668706082837').send(String(error))
            }
        } else if (avatar && !avatar.contentType.startsWith('image')) {
            log.write('invalid image \n')
            await interaction.reply('Please upload a valid image')
        }
	}

}
