import { Message } from 'discord.js';
import { Bot } from '../Bot';
import { Command } from "../Command"; 
import { CommandInterface} from '../typings';
import { CommandType } from '../typings/enums';

export default class PingCommand extends Command implements CommandInterface {
    constructor() {
        super({
            name: "ping",
            help: "get bot ping",
            usage: "ping",
            type: CommandType.Misc
        })
    }

    execute(client: Bot, msg: Message) {
        msg.reply(`Ping: ${Date.now() - msg.createdTimestamp}`);
    } 
}
