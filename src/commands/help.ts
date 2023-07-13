import { ApplicationCommandOptionType, ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';
import { Bot } from '../Bot.js';
import { Command, CommandType } from '../Command.js';

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
                void interaction.reply(`Command \`${commandName}\` does not exist!`);
                return;
            }

            void interaction.reply(`**${command.name}**\nHelp: ${command.help}\nUsage: ${command.usage}\nType: ${CommandType[command.type]}`);
            return;
        }

        const embed = new EmbedBuilder({
            title: 'Help Menu',
            description: `Use \`/help <command>\` for command-specific help`,
            timestamp: Date.now()
        });

        Object.keys(CommandType).filter(value => typeof CommandType[value as keyof typeof CommandType] == 'number').forEach(type => {
            embed.addFields({
                name: type,
                value: commands.filter(cmd => cmd.type == CommandType[type as keyof typeof CommandType]).map(cmd => cmd.name).join(', ')
            });
        });

        void interaction.reply({ embeds: [embed] });
    }
}
