import { ApplicationCommandOptionType, ChatInputCommandInteraction } from 'discord.js';
import { Bot } from '../Bot.js';
import { Command, CommandType } from '../Command.js';

export default class SayCommand extends Command {
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
        void interaction.reply(interaction.options.getString('message', true));
    }
}
