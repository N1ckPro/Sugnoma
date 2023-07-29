import process from 'process';
import { ApplicationCommandData, GatewayIntentBits, Partials } from 'discord.js';
import { Bot } from './Bot.js';
import 'dotenv/config';

const client = new Bot({
    allowedMentions: { repliedUser: false },
    failIfNotExists: false,
    intents: [GatewayIntentBits.DirectMessages, GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessages],
    partials: [Partials.Channel]
});

await client.setup();

client.on('interactionCreate', interaction => {
    if (!interaction.isChatInputCommand()) return;

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

    void client.application.commands.set(slashCommandsData);
});

void client.login(process.env.TOKEN);
