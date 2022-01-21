import { Message, MessageEmbed } from 'discord.js';
import { Bot } from '../Bot';
import { Command } from "../Command";
import { CommandInterface } from '../typings';
import { CommandType } from '../typings/enums';

export default class HelpCommand extends Command implements CommandInterface {
    constructor() {
        super({
            name: "help",
            help: "stop it get some help",
            usage: "help (command)",
            type: CommandType.Help
        })
    }

    execute(client: Bot, msg: Message, args: string[]) {
        const commands = client.commands;
        if (args.length != 0) {
            let command = commands.find(cmd => cmd.name == args[0])
            if (!command) {
                msg.reply(`Command \`${args[0]}\` does not exist!`)
                return;
            }
            msg.reply(`**${command.name}**\nHelp: ${command.help}\nUsage: ${command.usage}\nType: ${CommandType[command.type]}`);
            return;
        }
        
        const embed = new MessageEmbed({
            title: "Help Menu",
            description: `Prefix: \`${client.prefix}\`\nUse \`${client.prefix}help <command>\` for command-specific help`,
            timestamp: Date.now()
        })

        for (const type in Object.keys(CommandType).filter(value => typeof CommandType[value] == 'string')) {
            embed.addField(
                CommandType[type],
                commands.filter(cmd => cmd.type == Number(type)).map(cmd => cmd.name).join(', ')
            )
        }

        msg.reply({embeds: [embed]});
    }
}