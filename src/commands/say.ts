import { Message } from 'discord.js';
import { Bot } from '../Bot';
import { Command } from '../Command';
import { CommandInterface } from '../typings';
import { CommandType } from '../typings/enums';

export default class SayCommand extends Command implements CommandInterface {
    constructor() {
        super({
            name: 'say',
            help: 'make the bot say your message',
            usage: 'say <message>',
            type: CommandType.Misc
        });
    }

    execute(client: Bot, msg: Message, args: string[]) {
        try {
            msg.delete();
        // eslint-disable-next-line no-empty
        } catch {}

        msg.channel.send(args.join(' '));
    }
}
