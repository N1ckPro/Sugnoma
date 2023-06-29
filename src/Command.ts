import { ApplicationCommandOptionData, ChatInputCommandInteraction } from 'discord.js';
import { Bot } from './Bot.js';

export enum CommandType {
    Help, Image, Misc
}

export interface CommandOptions {
    args?: ApplicationCommandOptionData[]
    help: string
    name: string
    usage: string
    type: CommandType
}

export abstract class Command {
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

    public abstract execute(client: Bot, interaction: ChatInputCommandInteraction): void
}
