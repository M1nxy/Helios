import config from 'safer-dotenv';
import { Helios } from "./types/client.js";
import { ActivityType } from 'discord.js';
import { loadTextCommands } from "./commands/index.js";
import { loadEvents } from "./events/index.js"


const env = config<{ TOKEN: string }>();
const client = new Helios({
	intents: ["Guilds", "GuildMessages", "GuildMembers", "MessageContent"],
	allowedMentions: {parse: ['users', 'roles']},
	presence: {
		activities: [{
			name: 'beans',
			type: ActivityType.Listening,
		}]
	}
})

client.commands = await loadTextCommands();
client.events = await loadEvents();

client.bindEvents();

client.prefix = 'h!'

await client.login(env.TOKEN);
