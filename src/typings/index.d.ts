import { ApplicationCommandOptionData, ChatInputCommandInteraction } from 'discord.js';
import { CommandType } from './enums';
import { Bot } from '../Bot';

export interface CommandClass extends CommandInterface {
    new ()
}

export interface CommandInterface extends CommandOptions {
    execute(client: Bot, interaction: ChatInputCommandInteraction): void
}

export interface CommandOptions {
    args?: ApplicationCommandOptionData[]
    help: string
    name: string
    usage: string
    type: CommandType
}
