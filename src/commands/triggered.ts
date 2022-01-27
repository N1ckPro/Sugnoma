import { Canvacord } from 'canvacord';
import { Message } from 'discord.js';
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
        if (args.length >= 1) {
            const parsedUser = msg.guild?.members.cache.get(args[0].replaceAll(/[<@!>]/g, ''))?.user;
            if (!parsedUser) user = parsedUser;
        }
        const triggered = await Canvacord.trigger(user.displayAvatarURL({ format: 'png', dynamic: false }));
        const gif = { attachment: triggered, name: 'triggered.gif', description: `triggered ${user.tag}` };
        msg.reply({ files: [gif] });
    }
}
