import fs from 'file-system';
import _fs from 'fs';
import ls from 'ls';
import { cli_file } from "../../constants";
import { spawnSync } from "child_process";

export const ENTITY = {
	COMPONENTS: 'components',
	VIEWS: 'views'
};
export const SUPPORTED_ENTITIES = [ENTITY.COMPONENTS, ENTITY.VIEWS];

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
	return _fs.realpathSync(path);
};

export const getProjectPaths = ({ newProject = false } = {}) => {
	const terracePackage = spawnSync('which', ['terrace']).stdout.toString().slice(0, -1);	// Removed newline at the end of output
	const destination = newProject ? process.cwd() : getProjectRoot();	// Destination Project Root path, or cwd for new projects
	const source = getProjectRoot(_fs.realpathSync(terracePackage));	// Project Root path
	return { destination, source };
};

export const getAllFilesInGeneratedDirectory = (path) => {
	let entityName = path.split('/').slice(-1).join('');
	let command = spawnSync('find', [path]);
	if (command.status) throw new Error(`Command failed.\n${command.stderr.toString()}`);
	let output = command.stdout.toString().split('\n');
	return output.filter(_ => _)
		.filter(file => !_fs.lstatSync(file).isDirectory())
		.map(file => {
			let splitPath = file.split('/');
			let index = splitPath.indexOf(entityName) + 1;
			splitPath = splitPath.slice(index);
			return `${entityName.yellow.underline}/${splitPath.join('/').green.bold}`;
		}).join('\n').trim();
};

export const checkIfFolderExists = ({ resourcePath, titleCaseName, type }) => {
	if (_fs.existsSync(resourcePath)) {
		console.error(`Folder for ${type} ${titleCaseName.underline.bold} already exists.`.red, `Please remove it and try again.`.yellow);
		return true;
	}
	return false;
};
