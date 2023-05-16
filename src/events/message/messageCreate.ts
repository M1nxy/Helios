import { Event } from '../../types/event.js';

export default new Event('messageCreate', false, async (helios, message) => {
  if (!message.content.startsWith(helios.prefix)) return;
  const args = message.content.substring(helios.prefix.length).split(' ');
  const cmd = args.shift();
  if (cmd) {
    const command = helios.commands.get(cmd);
    if (command) {
      try {
        await command.execute(helios, message, args);
      } catch (e) {
        console.log(e);
        await message.reply('Something went wrong');
      }
    } else {
      await message.reply('Command not found!');
    }
  } else {
    await message.reply('No command specified!');
  }
});
