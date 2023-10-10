import { Event } from '../../lib/types/event.js';

export default new Event('interactionCreate', false, (helios, interaction) => {
  if (interaction.isUserContextMenuCommand()) {
    const cmd = helios.userContext.get(interaction.commandName);
    if (cmd) {
      try {
        cmd.execute(helios, interaction);
      } catch (e){
        console.log(e)
      }
    } else {
      interaction.reply('Something went wrong!');
    }
  }
});
