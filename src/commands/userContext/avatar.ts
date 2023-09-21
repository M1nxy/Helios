import { UserContextMenuCommand } from '$lib/types/command.js';
import { RandomEmbed } from '$lib/types/embed.js';
import { GuildMember } from 'discord.js';

export default new UserContextMenuCommand({
  name: 'Steal Avatar',
  desc: "Get a link to a user's profile picture!",
  execute: async (helios, interaction) => {
    await interaction.deferReply({ ephemeral: true });
    const member = interaction.targetMember as GuildMember;

    if (member) {
      const embed = new RandomEmbed({
        title: `${member.displayName}'s Profile`,
        url: member.displayAvatarURL(),
        image: {
          url: member.displayAvatarURL(),
        },
      });
      await interaction.followUp({
        embeds: [embed],
      });
    } else {
      await interaction.followUp('Something went wrong!');
    }
  },
});
