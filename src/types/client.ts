import { Client } from 'discord.js';
import { TextCommand } from './command.js';
import { Event } from './event.js';

export class Helios extends Client<true> {
  commands: Map<string, TextCommand> = new Map();
  events: Map<string, Event> = new Map();
  private _prefix = '';

  bindEvents() {
    for (const event of this.events.values()) {
      if (event.once) {
        this.once(event.name, (...args) => event.execute(this, ...args));
      } else {
        this.on(event.name, (...args) => event.execute(this, ...args));
      }
    }
  }

  get prefix() {
    return this._prefix;
  }

  set prefix(prefix: string) {
    this._prefix = prefix;
  }
}
