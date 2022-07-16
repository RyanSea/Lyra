const fs = require('node:fs')
const path = require('node:path')
const { REST } = require('@discordjs/rest')
const { Routes } = require('discord-api-types/v9')
const { botId, guildId, token } = require('./config.json')

const commands = []
const commandsPath = path.join(__dirname, 'commands')
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'))

for (const file of commandFiles) {
    console.log("file:",file)
	const filePath = path.join(commandsPath, file)
    console.log("filepath:",filePath)
	const command = require(filePath)
    console.log("command:",command.data.options[0])
	commands.push(command.data.toJSON())
}

const rest = new REST({ version: '9' }).setToken(token)

rest.put(Routes.applicationCommands(botId), { body: commands })
	.then(() => console.log('Successfully registered Lyra\'s commands!'))
	.catch(console.error)

    
exports.commands = commands;