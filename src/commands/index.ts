import { globSync } from "glob";
import { TextCommand } from "../types/command.js";


const loadCommands = async <T>(path: string): Promise<Map<string, T>> => {
	const cmds = globSync(path).map(async (_path) => {
		const command = await import(`./${_path.substring(13)}`);
		return [command.default.name, command.default];
	}) as Array<Promise<[string, T]>>;
	const commands = await Promise.all(cmds);

	return new Map<string, T>(commands)
}

export const loadTextCommands = async () => {
	return await loadCommands<TextCommand>('./src/commands/text/**/**.ts');
}
