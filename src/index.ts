import { ActivityType } from 'discord.js';
import http from 'http';
import config from 'safer-dotenv';
import { formatDistance } from 'date-fns';
import { Helios } from './lib/types/client.js';
import { loadEvents } from './events/index.js';
import { loadTextCommands, loadUserContextCommand } from './commands/index.js';

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

// Healthcheck
const server = http.createServer(async (req, res) => {
  const status = client.isReady() ? 200 : 503;
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(
    JSON.stringify({
      connected: client.isReady(),
      uptime: formatDistance(Date.now() - client.uptime, Date.now()),
      servers: await Promise.all(
        client.guilds.cache.map(async (i) => {
          return { name: i.name, id: i.id, owner: (await i.fetchOwner()).user.tag };
        }),
      ),
    }),
  );
});

async function main() {
  client.commands = await loadTextCommands();
  client.userContext = await loadUserContextCommand();
  client.events = await loadEvents();

  client.prefix = 'h!';
  client.bindEvents();

  await client.login(env.TOKEN || process.env.TOKEN);
  await client.deployGlobalCommands();
  // await client.deployGuildCommands('866087438077132850'); // test server
  server.listen(80);
}
main();
