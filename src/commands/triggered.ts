import { canvacord } from 'canvacord';
import { ApplicationCommandOptionType, AttachmentBuilder, ChatInputCommandInteraction } from 'discord.js';
import { Bot } from '../Bot.js';
import { Command, CommandType } from '../Command.js';

export default class TriggeredCommand extends Command {
    constructor() {
        super({
            args: [{
                description: 'User to trigger.',
                name: 'user',
                type: ApplicationCommandOptionType.User
            }],
            name: 'triggered',
            help: 'apply triggered overlay to a profile picture',
            usage: 'triggered (user)',
            type: CommandType.Image
        });
    }

    async execute(client: Bot, interaction: ChatInputCommandInteraction) {
        const user = interaction.options.getUser('user') ?? interaction.user;
        const triggered = await canvacord.triggered(user.displayAvatarURL({ extension: 'png' }));
        const attachment = new AttachmentBuilder(triggered, { name: 'triggered.gif' });
        void interaction.reply({ files: [attachment] });
    }
}
