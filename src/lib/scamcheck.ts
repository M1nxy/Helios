// import extractUrls from 'extract-urls';
import { EmbedBuilder, inlineCode, Message } from 'discord.js';

const API_URL = 'https://api.exerra.xyz/v2/scam?url=';

const compromisedEmbed = (message: Message) =>
  new EmbedBuilder()
    .setTitle('Compromised Account')
    .setDescription(
      `Your account has been compromised and used to promote a scam! As a result, you have been banned from ${
        message.guild ? message.guild.name : 'null'
      }. If you still have access to this account, change your password or delete it. In the future, be more careful with handling random data on the internet and never download anything from websites unless it is 100% trustworthy.`,
    )
    .setFooter({ text: `👋 Code provided by scambegone` })
    .setTimestamp();

function extractUrls(str: string) {
  const urls = str.match(
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()'@:%_\+.~#?!&//=]*)/gi,
  );
  return urls ? urls.map((i) => i.toLowerCase().replace(/[()]/g, '')) : undefined;
}

async function scamAPI(message: string): Promise<boolean> {
  const links = extractUrls(message);
  if (!links) return false;
  const flagged = await Promise.all(
    links.map(async (link) => {
      const res = await fetch(`${API_URL}${link}`);
      if (res.status === 200) {
        const { data } = await res.json();
        return data ? data.isScam : false;
      }
      return false;
    }),
  );
  return flagged.reduce((res, cur) => res || cur, false);
}

export async function scamCheck(message: Message) {
  try {
    // Sanity Check because I distrust occult's api
    if (await scamAPI(message.content)) {
      if (!message.guild) return;
      const perms = (await message.guild.members.fetchMe()).permissions;
      const author = await message.guild.members.fetch(message.author);

      if (perms.has('BanMembers') && author.bannable) {
        (await author.createDM()).send({
          embeds: [compromisedEmbed(message)],
        });
        message.guild.members.ban(author, {
          reason: 'Compromised Account Detected  😞',
          deleteMessageDays: 3,
        });
      } else {
        message.reply(
          "This is a scam related message. Please fix this bot's permissions and/or move the bot role higher.\nRequired Permissions: " +
            inlineCode('Ban Members'),
        );
      }
    }
  } catch (e) {
    console.log('There was an issue checking the scam api');
  }
}
