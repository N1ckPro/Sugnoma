import { Canvacord } from 'canvacord';
import { ApplicationCommandOptionType, AttachmentBuilder, ChatInputCommandInteraction } from 'discord.js';
import { Bot } from '../Bot';
import { Command, CommandType } from '../Command';

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
        const triggered = await Canvacord.trigger(user.displayAvatarURL({ extension: 'png' }));
        const attachment = new AttachmentBuilder(triggered, { name: 'triggered.gif' });
        interaction.reply({ files: [attachment] });
    }
}
