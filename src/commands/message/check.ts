import { TextCommand } from '../../types/command.js';
import { RandomEmbed } from '../../types/embed.js';

// this stuff goes in another file lmfao
// const regexp = https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()'@:%_\+.~#?!&//=]*)/gi;
// const API_URL = 'https://api.exerra.xyz/v2/scam?url=';

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
