import config from 'safer-dotenv';
import { ActivityType } from 'discord.js';
import { Helios } from './lib/types/client.js';
import { loadEvents } from './events/index.js';
import { loadTextCommands, loadUserContextCommand } from './commands/index.js';
import http from 'http';

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
const server = http.createServer((req, res) => {
  const status = client.isReady() ? 200 : 503;
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    connected: client.isReady(),
    uptime: client.uptime
  }));
});

async function main() {
  client.commands = await loadTextCommands();
  client.userContext = await loadUserContextCommand();
  client.events = await loadEvents();

  client.prefix = 'h!';
  client.bindEvents();

  await client.login(env.TOKEN || process.env.TOKEN);
  await client.deployCommands('866087438077132850'); // the test server
  server.listen(80);
}
main();
