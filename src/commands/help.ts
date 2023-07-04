import { ApplicationCommandOptionType, ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';
import { Bot } from '../Bot';
import { Command, CommandType } from '../Command';

export default class HelpCommand extends Command {
    constructor() {
        super({
            args: [{
                description: 'Command name',
                name: 'name',
                type: ApplicationCommandOptionType.String
            }],
            name: 'help',
            help: 'stop it get some help',
            usage: 'help (command)',
            type: CommandType.Help
        });
    }

    execute(client: Bot, interaction: ChatInputCommandInteraction) {
        const commands = client.commands;

        const commandName = interaction.options.getString('name');

        if (commandName) {
            const command = commands.get(commandName);
            if (!command) {
                interaction.reply(`Command \`${commandName}\` does not exist!`);
                return;
            }

            interaction.reply(`**${command.name}**\nHelp: ${command.help}\nUsage: ${command.usage}\nType: ${CommandType[command.type]}`);
            return;
        }

        const embed = new EmbedBuilder({
            title: 'Help Menu',
            description: `Use \`/help <command>\` for command-specific help`,
            timestamp: Date.now()
        });

        for (const type in Object.keys(CommandType).filter(value => typeof CommandType[value] == 'string')) {
            embed.addFields({
                name: CommandType[type],
                value: commands.filter(cmd => cmd.type == Number(type)).map(cmd => cmd.name).join(', ')
            });
        }

        interaction.reply({ embeds: [embed] });
    }
}
