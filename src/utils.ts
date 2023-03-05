
import * as child_process from 'child_process';
import { promisify } from 'util';

/**
 * Execute shell command
 *
 * @param cmd
 */
export async function shell(cmd: string) {
	console.log(`$ ${cmd}`);
	const exec = promisify(child_process.exec);
	const { stdout, stderr } = await exec(cmd);

	if (stderr) {
		console.error('Error: Command failed with code', stderr);
	}
	return stdout;
}


/**
 * Execute sqlite3 command
 *
 * @param sql
 * @param sqliteDBPath
 */
export async function sqlite3<T>(sql: string, sqliteDBPath: string): Promise<T> {
	const command = `echo "${sql}" | sqlite3 ${sqliteDBPath} -json`;
	return JSON.parse(await shell(command));
}
