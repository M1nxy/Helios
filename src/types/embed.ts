import { EmbedBuilder, EmbedData } from 'discord.js';

export class RandomEmbed extends EmbedBuilder {
  constructor(opts?: EmbedData) {
    super(opts);
    this.setFooter({
      text: 'Helios v2',
    }).setTimestamp();
  }
}
