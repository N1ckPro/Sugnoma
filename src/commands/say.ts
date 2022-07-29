import { ApplicationCommandOptionType, ChatInputCommandInteraction } from 'discord.js';
import { Bot } from '../Bot';
import { Command } from '../Command';
import { CommandInterface } from '../typings';
import { CommandType } from '../typings/enums';

export default class SayCommand extends Command implements CommandInterface {
    constructor() {
        super({
            args: [{
                description: 'Message to say.',
                name: 'message',
                required: true,
                type: ApplicationCommandOptionType.String
            }],
            name: 'say',
            help: 'make the bot say your message',
            usage: 'say <message>',
            type: CommandType.Misc
        });
    }

    execute(client: Bot, interaction: ChatInputCommandInteraction) {
        interaction.reply(interaction.options.getString('message', true));
    }
}
