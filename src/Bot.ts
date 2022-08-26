import { readdirSync } from 'fs';
import { Client, ClientOptions, Collection } from 'discord.js';
import { CommandInterface, Constructable } from './typings';

export class Bot extends Client<true> {
    public commands: Collection<string, CommandInterface>;

    constructor(options: ClientOptions) {
        super(options);
        this.commands = new Collection();
    }

    async setup() {
        const commandFiles = readdirSync('./src/commands').filter(file => file.toString().endsWith('.ts'));
        for (const file of commandFiles) {
            const commandFile = await import(`./commands/${file}`) as { default: Constructable<CommandInterface> };
            const command: CommandInterface = new commandFile.default();
            this.commands.set(command.name, command);
        }

        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const { token } = require('../config.json');
        this.login(token);
    }
}
