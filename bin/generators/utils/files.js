import fs from 'file-system';
import _fs from 'fs';
import ls from 'ls';
import { cli_file } from "../../constants";

export const load = (path) => {
	return _fs.readFileSync(path).toString();
};

export const save = (path, data) => {
	fs.writeFileSync(path, data);
};

export const loadAllFiles = (path) => {
	return [...ls(path + '.*'), ...ls(path + '*')];
};

export const getProjectRoot = (path = process.cwd()) => {
	let isDirectory = _fs.lstatSync(path).isDirectory();
	path = isDirectory ? path : path.split('/').slice(0, -1).join('/');

	while(!loadAllFiles(`${path}/`).map(file => file.file).includes(cli_file)) {
		path = `${path}/..`;

		if (_fs.realpathSync(path) === '/') throw new Error('Project root wasn\'t found.');
	}
	return path;
};
