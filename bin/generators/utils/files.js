import fs from 'file-system';
import _fs from 'fs';
import ls from 'ls';
import { cli_file } from "../../constants";
import { spawnSync } from "child_process";
import { CriticalError, PatternMismatchError } from './error-handlers';
import { NO_PROJECT_ROOT, RESOURCE_EXISTS } from './error-codes';

export const ENTITY = {
  COMPONENTS: 'components',
  VIEWS: 'views',
  MOCKS: 'mocks'
};
export const SUPPORTED_ENTITIES = [ENTITY.COMPONENTS, ENTITY.VIEWS, ENTITY.MOCKS];

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
  path = isDirectory ? path : path.split('/').slice(0, -1).makePath();

  while(!loadAllFiles(`${path}/`).map(file => file.file).includes(cli_file)) {
  	path = `${path}/..`;

  	if (_fs.realpathSync(path) === '/') CriticalError('Project root wasn\'t found.', NO_PROJECT_ROOT);
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
  if (command.status) CriticalError(`Command failed.\n${command.stderr.toString()}`, command.status);

  let output = command.stdout.toString().split('\n');
  return output.filter(_ => _)
  	.filter(file => !_fs.lstatSync(file).isDirectory())
  	.map(file => {
  		let splitPath = file.split('/');
  		let index = splitPath.indexOf(entityName) + 1;
  		splitPath = splitPath.slice(index);
  		return `${entityName.yellow.underline}/${splitPath.makePath().green.bold}`;
  	}).join('\n').trim();
};

export const getFilePathWithParents = (file, parentsCount = 1) => {
  parentsCount *= -1;
  let splitPath = file.split('/');
  let fileName = splitPath.splice(-1).makePath();
  let parentPath = splitPath.slice(parentsCount).makePath();
  return `${parentPath.yellow.underline}/${fileName.green.bold}`;
};

export const checkIfFolderExistsOrTerminateProgram = ({ resourcePath, titleCaseName, type }) => {
  if (!_fs.existsSync(resourcePath)) {
  	return false;
  }
  CriticalError(`Folder for ${type} ${titleCaseName.underline.bold} already exists.`.red, `Please remove it and try again.`.yellow, RESOURCE_EXISTS);
};

/**
 * Return param is it matches the pattern, else exit program.
 * @param name
 * @returns {*}
 */
export const checkIfNamePatternIsCorrectOrTerminateProgram = ({ name }) => {
  let processedName = name.match(/^[a-z]([a-z0-9-]+)?/i);
  if (!processedName) PatternMismatchError();
  return processedName[0];
};
