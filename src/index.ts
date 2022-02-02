import process from 'process';
import { ApplicationCommandData } from 'discord.js';
import { Bot } from './Bot';

const client = new Bot({
    allowedMentions: { repliedUser: false },
    failIfNotExists: false,
    intents: ['DIRECT_MESSAGES', 'GUILDS', 'GUILD_MEMBERS', 'GUILD_MESSAGES'],
    partials: ['CHANNEL']
});

client.setup();

client.on('interactionCreate', interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.find(cmd => cmd.name == interaction.commandName);
    command?.execute(client, interaction);
});

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}...`);

    if (!process.argv.includes('-register')) return;

    const slashCommandsData: ApplicationCommandData[] = client.commands.map(command => ({
        name: command.name,
        description: command.help,
        options: command.args
    }));
    client.guilds.cache.get('713087245229359126')?.commands.set(slashCommandsData);
});
