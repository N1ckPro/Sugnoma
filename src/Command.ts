import { ApplicationCommandOptionData } from 'discord.js';
import { CommandOptions } from './typings';
import { CommandType } from './typings/enums';

export class Command {
    public args: ApplicationCommandOptionData[] | undefined;
    public name: string;
    public help: string;
    public usage: string;
    public type: CommandType;

    constructor({ args, name, help, usage, type }: CommandOptions) {
        this.args = args;
        this.name = name;
        this.help = help;
        this.usage = usage;
        this.type = type;
    }
}
