import { ChatInputCommandInteraction } from 'discord.js';
import { Bot } from '../Bot';
import { Command, CommandType } from '../Command';

export default class SussyCommand extends Command {
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
