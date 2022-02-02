import { Canvacord } from 'canvacord';
import { CommandInteraction, MessageAttachment } from 'discord.js';
import { Bot } from '../Bot';
import { Command } from '../Command';
import { CommandInterface } from '../typings';
import { CommandType } from '../typings/enums';

export default class TriggeredCommand extends Command implements CommandInterface {
    constructor() {
        super({
            args: [{
                description: 'User to trigger.',
                name: 'user',
                type: 'USER'
            }],
            name: 'triggered',
            help: 'apply triggered overlay to a profile picture',
            usage: 'triggered (user)',
            type: CommandType.Image
        });
    }

    async execute(client: Bot, interaction: CommandInteraction) {
        const user = interaction.options.getUser('user') ?? interaction.user;
        const triggered = await Canvacord.trigger(user.displayAvatarURL({ format: 'png', dynamic: false }));
        const attachment = new MessageAttachment(triggered, 'triggered.gif');
        interaction.reply({ files: [attachment] });
    }
}
