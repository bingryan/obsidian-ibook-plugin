import * as child_process from "child_process";
import { promisify } from "util";
import IbookPlugin from "@/plugin";

/**
 * rm `/n` `/r` `/r/n
 *
 * @param str
 */
export function removeTags(str: string | null) {
	if (str) {
		return str.replace(/(\r\n|\n|\r)/gm, "");
	}
	return str;
}

/**
 * create folder
 *
 * @param plugin
 * @param path
 */
export async function tryCreateFolder(plugin: IbookPlugin, path: string) {
	try {
		await plugin.app.vault.createFolder(path);
	} catch (error) {
		if (!error.message.contains("Folder already exists")) {
			throw error;
		}
	}
}

/**
 * Execute shell command
 *
 * @param cmd
 */
export async function shell(cmd: string) {
	console.log(`$ ${cmd}`);
	const exec = promisify(child_process.exec);
	// issue: #49
	// set maxBuffer to 100MB
	const { stdout, stderr } = await exec(cmd, { maxBuffer: 100 * 1024 * 1024 });

	if (stderr) {
		console.error("Error: Command failed with code", stderr);
	}
	return stdout;
}

/**
 * Execute sqlite3 command
 *
 * @param sql
 * @param sqliteDBPath
 */
export async function sqlite3<T>(
	sql: string,
	sqliteDBPath: string
): Promise<T> {
	const command = `echo "${sql}" | sqlite3 ${sqliteDBPath} -json`;
	const res = await shell(command);
	if (res === "") {
		return JSON.parse("[]");
	}
	return JSON.parse(res);
}

/**
 *  html decode
 * @param input string to decode
 * @returns 
 */
export function htmlDecode(input: string): string {
	const doc = new DOMParser().parseFromString(input, "text/html");
	return doc.documentElement.textContent || "";
}