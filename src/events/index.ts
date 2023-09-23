import { globSync } from 'glob';
import { Event } from '../lib/types/event.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const loadEvents = async (): Promise<Map<string, Event>> => {
  const evs = globSync(`${__dirname}/**/**.{js,ts}`)
  .filter(i => !i.endsWith(".d.ts") && !i.endsWith("index.js") && !i.endsWith("index.ts"))
  .map(async (_path) => {
    const event = await import(_path);
    return [event.default.name, event.default];
  }) as Array<Promise<[string, Event]>>;
  const events = await Promise.all(evs);

  return new Map<string, Event>(events);
};
