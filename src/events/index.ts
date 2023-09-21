import { globSync } from 'glob';
import { Event } from '../lib/types/event.js';

export const loadEvents = async (): Promise<Map<string, Event>> => {
  const evs = globSync('./src/events/**/**.ts', {
    ignore: 'src/events/index.ts',
  }).map(async (_path) => {
    const event = await import(`./${_path.substring(11)}`);
    return [event.default.name, event.default];
  }) as Array<Promise<[string, Event]>>;
  const events = await Promise.all(evs);

  return new Map<string, Event>(events);
};
