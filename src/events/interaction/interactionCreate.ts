import { Event } from '../../types/event.js';

export default new Event('interactionCreate', false, (helios, interaction) => {
  if (interaction.isUserContextMenuCommand()) {
    const cmd = helios.userContext.get(interaction.commandName);
    if (cmd) {
      cmd.execute(helios, interaction);
    } else {
      interaction.reply('Something went wrong!');
    }
  }
});
