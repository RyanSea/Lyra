const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Intents } = require('discord.js');
const { token } = require('./config.json')

const bot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.GUILD_MESSAGES] });

bot.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

const fs = require('fs');
let log = fs.createWriteStream('logs/lyra_log.log') 
let err = fs.createWriteStream('lyra_err.log') 

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	bot.commands.set(command.data.name, command);
}

bot.once('ready', async () => {
	console.log('Lyra arrived✨');

});


bot.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = bot.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		err.write('Top level error:' + String(error) + "\n")
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		await bot.users.cache.get('814847668706082837').send(String(error))
	}
});

bot.login(token);