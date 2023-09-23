import { globSync } from 'glob';
import { UserContextMenuCommand, TextCommand } from '../lib/types/command.js';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';


const loadCommands = async <T>(path: string): Promise<Map<string, T>> => {
  const cmds = globSync(path).filter(i => !i.endsWith(".d.ts")).map(async (_path) => {
    const command = await import(_path);
    return [command.default.name, command.default];
  }) as Array<Promise<[string, T]>>;
  const commands = await Promise.all(cmds);

  return new Map<string, T>(commands);
};



const __dirname = dirname(fileURLToPath(import.meta.url));

export const loadTextCommands = async () => {
  return await loadCommands<TextCommand>(`${__dirname}/message/**/**.{js,ts}`);
};

export const loadUserContextCommand = async () => {
  return await loadCommands<UserContextMenuCommand>(`${__dirname}/userContext/**/**.{js,ts}`);
};
