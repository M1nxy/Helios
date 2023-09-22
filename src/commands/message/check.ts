import { TextCommand } from '../../lib/types/command.js';
import { RandomEmbed } from '../../lib/types/embed.js';

export default new TextCommand({
  name: 'help',
  desc: 'View the help page!',
  execute: async (_, message) => {
    await message.reply({
      embeds: [
        new RandomEmbed({
          title: 'Help Page',
          description: 'Work in progress!',
        }),
      ],
    });
    return;
  },
});
