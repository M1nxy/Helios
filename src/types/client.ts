import { ApplicationCommandType, Client, ContextMenuCommandBuilder, Routes } from 'discord.js';
import { UserContextMenuCommand, TextCommand } from './command.js';
import { Event } from './event.js';

export class Helios extends Client<true> {
  commands: Map<string, TextCommand> = new Map();
  userContext: Map<string, UserContextMenuCommand> = new Map();
  events: Map<string, Event> = new Map();
  private _prefix = '';

  get prefix() {
    return this._prefix;
  }

  set prefix(prefix: string) {
    this._prefix = prefix;
  }

  bindEvents() {
    for (const event of this.events.values()) {
      if (event.once) {
        this.once(event.name, (...args) => event.execute(this, ...args));
      } else {
        this.on(event.name, (...args) => event.execute(this, ...args));
      }
    }
  }

  async deployCommands(guildId: string) {
    const userContext = [...this.userContext.values()].map((cmd) => {
      return new ContextMenuCommandBuilder().setName(cmd.name).setType(ApplicationCommandType.User).toJSON();
    });

    const commands = [...userContext];

    try {
      console.log(`Started refreshing ${commands.length} application (/) commands.`);

      const data = (await this.rest.put(Routes.applicationGuildCommands(this.application.id, guildId), {
        body: commands,
      })) as unknown[];

      console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    } catch (error) {
      console.error(error);
    }
  }
}
