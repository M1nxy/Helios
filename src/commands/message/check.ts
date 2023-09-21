import { TextCommand } from '$lib/types/command';
import { RandomEmbed } from '$lib/types/embed';

export default new TextCommand({
  name: 'help',
  desc: 'View the help page!',
  execute: async (helios, message) => {
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
