import { ChatInputCommandInteraction } from 'discord.js';
import { Bot } from '../Bot.js';
import { Command, CommandType } from '../Command.js';

export default class PingCommand extends Command {
    constructor() {
        super({
            name: 'ping',
            help: 'get bot ping',
            usage: 'ping',
            type: CommandType.Misc
        });
    }

    execute(client: Bot, interaction: ChatInputCommandInteraction) {
        void interaction.reply(`Ping: ${Date.now() - interaction.createdTimestamp}`);
    }
}
