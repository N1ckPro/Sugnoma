import { Canvacord } from 'canvacord';
import { Message, MessageAttachment } from 'discord.js';
import { Bot } from '../Bot';
import { Command } from '../Command';
import { CommandInterface } from '../typings';
import { CommandType } from '../typings/enums';

export default class TriggeredCommand extends Command implements CommandInterface {
    constructor() {
        super({
            name: 'triggered',
            help: 'apply triggered overlay to a profile picture',
            usage: 'triggered (user)',
            type: CommandType.Image
        });
    }

    async execute(client: Bot, msg: Message, args: string[]) {
        let user = msg.author;
        if (args.length >= 1 && msg.guild) {
            try {
                user = (await (msg.guild.members.fetch(args[0].replaceAll(/[<@!>]/g, '')))).user;
            } catch {}
        }
        const triggered = await Canvacord.trigger(user.displayAvatarURL({ format: 'png', dynamic: false }));
        const attachment = new MessageAttachment(triggered, 'triggered.gif');
        msg.reply({ files: [attachment] });
    }
}
