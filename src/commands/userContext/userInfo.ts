import { UserContextMenuCommand } from '$lib/types/command.js';
import { RandomEmbed } from '$lib/types/embed.js';
import { GuildMember, userMention, roleMention, time, AttachmentBuilder, inlineCode } from 'discord.js';
import { createCanvas } from 'canvas';

// this is a kinda ass tbh

function getAccentBanner(color: `#${string}`): AttachmentBuilder {
  const canvas = createCanvas(128, 64);
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  return new AttachmentBuilder(canvas.toBuffer(), { name: 'banner.png', description: 'banner' });
}

export default new UserContextMenuCommand({
  name: 'User Information',
  desc: 'Get information about a user!',
  execute: async (helios, interaction) => {
    await interaction.deferReply({ ephemeral: true });
    const member = interaction.targetMember as GuildMember;

    if (member) {
      const user = await member.user.fetch();
      const banner = user.bannerURL();

      const embed = new RandomEmbed({
        title: member.displayName,
        description: userMention(user.id),
        thumbnail: {
          url: member.displayAvatarURL(),
        },
        fields: [
          {
            name: 'Joined',
            value: time(member.joinedTimestamp ? Math.floor(member.joinedTimestamp / 1000) : 0),
          },
          {
            name: 'Created',
            value: time(Math.floor(user.createdTimestamp / 1000)),
          },
          {
            name: 'Roles',
            value: member.roles.cache.map((i) => roleMention(i.id)).join(' '),
          },
          {
            name: 'Permissions',
            value: member.permissions
              .toArray()
              .map((i) => inlineCode(i))
              .join(' '),
          },
        ],
      });
      const files = [];

      if (banner) {
        embed.setImage(banner);
      } else if (user.hexAccentColor) {
        files.push(getAccentBanner(user.hexAccentColor));
        embed.setImage('attachment://banner.png');
      }
      await interaction.followUp({
        embeds: [embed],
        files,
      });
    } else {
      await interaction.followUp('Something went wrong!');
    }
  },
});
