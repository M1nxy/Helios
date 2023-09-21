import { Awaitable, ClientEvents } from 'discord.js';
import { Helios } from './client.js';

interface EventOpts<K extends keyof ClientEvents> {
  name: keyof ClientEvents;
  once: boolean;
  execute: (client: Helios, ...args: ClientEvents[K]) => Awaitable<void>;
}

// hacky work around m8
// eslint-disable-next-line
export class Event<K extends keyof ClientEvents = any> implements EventOpts<K> {
  name: keyof ClientEvents;
  once: boolean;
  execute: (client: Helios, ...args: ClientEvents[K]) => Awaitable<void>;

  constructor(name: K, once: boolean, execute: (helios: Helios, ...args: ClientEvents[K]) => Awaitable<void>) {
    this.name = name;
    this.once = once;
    this.execute = execute;
  }
}
