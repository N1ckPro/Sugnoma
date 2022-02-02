import { CommandInteraction, MessageEmbed } from 'discord.js';
import { Bot } from '../Bot';
import { Command } from '../Command';
import { CommandInterface } from '../typings';
import { CommandType } from '../typings/enums';

export default class HelpCommand extends Command implements CommandInterface {
    constructor() {
        super({
            args: [{
                description: 'Command name',
                name: 'name',
                type: 'STRING'
            }],
            name: 'help',
            help: 'stop it get some help',
            usage: 'help (command)',
            type: CommandType.Help
        });
    }

    execute(client: Bot, interaction: CommandInteraction) {
        const commands = client.commands;

        const commandName = interaction.options.getString('name'); // you will use "name" later

        if (commandName) {
            const command = commands.get(commandName);
            if (!command) {
                interaction.reply(`Command \`${commandName}\` does not exist!`);
                return;
            }

            interaction.reply(`**${command.name}**\nHelp: ${command.help}\nUsage: ${command.usage}\nType: ${CommandType[command.type]}`);
            return;
        }

        const embed = new MessageEmbed({
            title: 'Help Menu',
            description: `Use \`/help <command>\` for command-specific help`,
            timestamp: Date.now()
        });

        for (const type in Object.keys(CommandType).filter(value => typeof CommandType[value] == 'string')) {
            embed.addField(
                CommandType[type],
                commands.filter(cmd => cmd.type == Number(type)).map(cmd => cmd.name).join(', ')
            );
        }

        interaction.reply({ embeds: [embed] });
    }
}
