import { CommandInteraction } from 'discord.js';
import { Bot } from '../Bot';
import { Command } from '../Command';
import { CommandInterface } from '../typings';
import { CommandType } from '../typings/enums';

export default class PingCommand extends Command implements CommandInterface {
    constructor() {
        super({
            name: 'sussy',
            help: 'Sends a sussy gif.',
            usage: 'sussy',
            type: CommandType.Misc
        });
    }

    execute(client: Bot, interaction: CommandInteraction) {
        interaction.reply(`https://tenor.com/view/the-rock-rock-gif-21708339`);
    }
}
