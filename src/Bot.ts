import { readdirSync } from 'fs';
import { Client, ClientOptions, Collection } from 'discord.js';
import { Command } from './Command';

export type Constructable<T> = new (...args: unknown[]) => T;

export class Bot extends Client<true> {
    public commands: Collection<string, Command>;

    constructor(options: ClientOptions) {
        super(options);
        this.commands = new Collection();
    }

    async setup() {
        const commandFiles = readdirSync('./src/commands').filter(file => file.toString().endsWith('.ts'));
        for (const file of commandFiles) {
            const commandFile = await import(`./commands/${file}`) as { default: Constructable<Command> };
            const command = new commandFile.default();
            this.commands.set(command.name, command);
        }

        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const { token } = require('../config.json');
        this.login(token);
    }
}
