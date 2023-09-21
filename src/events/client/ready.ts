import { Event } from '$lib/types/event.js';
import { Helios } from '$lib/types/client.js';

export default new Event('ready', true, (helios: Helios) => {
  console.log(`Ready as ${helios.user.tag}`);
});
