import config from 'safer-dotenv';
import { ActivityType } from 'discord.js';
import { Helios } from '$lib/types/client';
import { loadEvents } from './events/index';
import { loadTextCommands, loadUserContextCommand } from './commands/index';

const env = config<{ TOKEN: string }>();
const client = new Helios({
  intents: ['Guilds', 'GuildMessages', 'GuildMembers', 'MessageContent'],
  allowedMentions: { parse: ['users', 'roles'] },
  presence: {
    activities: [
      {
        name: 'for scams',
        type: ActivityType.Watching,
      },
    ],
  },
});

async function main() {
  client.commands = await loadTextCommands();
  client.userContext = await loadUserContextCommand();
  client.events = await loadEvents();

  client.prefix = 'h!';
  client.bindEvents();

  await client.login(env.TOKEN);
  await client.deployCommands('866087438077132850');
}
main();
