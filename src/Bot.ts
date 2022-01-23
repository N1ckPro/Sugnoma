import { readdirSync } from 'fs';
import process from 'process';
import { Client, ClientOptions, Collection } from 'discord.js';
import { CommandClass, CommandInterface } from './typings';

export class Bot extends Client<true> {
    public commands: Collection<string, CommandInterface>;
    public prefix: string;

    constructor(options: ClientOptions, prefix: string) {
        super(options);
        this.commands = new Collection();
        this.prefix = prefix;
    }

    async setup() {
        const commandFiles = readdirSync('./src/commands').filter(file => file.toString().endsWith('.ts'));
        for (const file of commandFiles) {
            const commandFile = await import(`./commands/${file}`) as { default: CommandClass };
            const command: CommandInterface = new commandFile.default();
            this.commands.set(command.name, command);
        }

        const { token } = process.argv.includes('-workflow') ? require('../config.example.json') : require('../config.json');
        if (process.argv.includes('-workflow')) process.exit();
        this.login(token);
    }
}
