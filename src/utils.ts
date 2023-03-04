import * as shell from 'shelljs';


/**
 * Execute shell command
 *
 * @param cmd
 * @param fatal
 */
export const exec = (cmd: string, fatal = true) => {
	console.log(`$ ${cmd}`);
	const res = shell.exec(cmd, { silent: true });
	if (res.code !== 0) {
		console.error('Error: Command failed with code', res.code);
		console.log(res);
		if (fatal) {
			process.exit(1);
		}
	}
	return res;
};


