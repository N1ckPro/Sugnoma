import { ChatInputCommandInteraction } from 'discord.js';
import { Bot } from '../Bot';
import { Command } from '../Command';
import { CommandInterface } from '../typings';
import { CommandType } from '../typings/enums';

export default class SussyCommand extends Command implements CommandInterface {
    constructor() {
        super({
            name: 'sussy',
            help: 'Sends a sussy gif.',
            usage: 'sussy',
            type: CommandType.Misc
        });
    }

    execute(client: Bot, interaction: ChatInputCommandInteraction) {
        interaction.reply(`https://tenor.com/view/the-rock-rock-gif-21708339`);
    }
}
