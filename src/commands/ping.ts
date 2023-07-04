import { ChatInputCommandInteraction } from 'discord.js';
import { Bot } from '../Bot';
import { Command, CommandType } from '../Command';

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
        interaction.reply(`Ping: ${Date.now() - interaction.createdTimestamp}`);
    }
}
