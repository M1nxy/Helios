import { Event } from '../../types/event.js';
import { Helios } from '../../types/client.js';

export default new Event('ready', true, (helios: Helios) => {
  console.log(`Ready as ${helios.user.tag}`);
});
