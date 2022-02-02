import { CommandInteraction } from 'discord.js';
import { Bot } from '../Bot';
import { Command } from '../Command';
import { CommandInterface } from '../typings';
import { CommandType } from '../typings/enums';

export default class PingCommand extends Command implements CommandInterface {
    constructor() {
        super({
            name: 'ping',
            help: 'get bot ping',
            usage: 'ping',
            type: CommandType.Misc
        });
    }

    execute(client: Bot, interaction: CommandInteraction) {
        interaction.reply(`Ping: ${Date.now() - interaction.createdTimestamp}`);
    }
}
