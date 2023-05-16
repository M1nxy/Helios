import { Awaitable, Message } from 'discord.js';
import { Helios } from './client.js';

interface BaseCommandOptions {
  name: string;
  desc: string;
}

export class BaseCommand implements BaseCommandOptions {
  name: string;
  desc: string;

  constructor(options: BaseCommandOptions) {
    this.name = options.name;
    this.desc = options.desc;
  }
}

interface TextCommandOptions extends BaseCommandOptions {
  execute: (helios: Helios, message: Message, args: string[]) => Awaitable<void>;
}

export class TextCommand extends BaseCommand implements TextCommandOptions {
  execute: (helios: Helios, message: Message, args: string[]) => Awaitable<void>;

  constructor(options: TextCommandOptions) {
    super(options);
    this.execute = options.execute;
  }
}
