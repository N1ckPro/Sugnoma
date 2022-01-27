import { Bot } from './Bot';

const client = new Bot({
    allowedMentions: { repliedUser: false },
    failIfNotExists: false,
    intents: ['DIRECT_MESSAGES', 'GUILDS', 'GUILD_MEMBERS', 'GUILD_MESSAGES'],
    partials: ['CHANNEL']
}, '*');

client.setup();

client.on('messageCreate', msg => {
    if (!msg.content.startsWith(client.prefix)) return;

    const args = msg.content.split(' ');
    const commandName = args[0].substring(client.prefix.length);
    args.shift();

    const command = client.commands.find(cmd => cmd.name == commandName);
    if (!command) return;

    command.execute(client, msg, args);
});

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}...`);
});
