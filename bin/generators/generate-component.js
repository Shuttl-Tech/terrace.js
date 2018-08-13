import v from 'voca';
import {getProjectRoot, load, save} from "./utils/files";
import { PatternMismatchError } from './utils/errors';
import {spawnSync} from "child_process";
import _fs from "fs";

export const generateComponent = ({ name }) => {
	const terracePackage = spawnSync('which', ['terrace']).stdout.toString().slice(0, -1);	// Removed newline at the end of output
	const destination = getProjectRoot();	// Destination Project Root path
	const source = getProjectRoot(_fs.realpathSync(terracePackage));	// Project Root path

	if (!name) throw new Error('Missing Component Name. Please specify a component name.');
	let processedName = name.match(/^[a-z]([a-z0-9-]+)?/i);
	if (!processedName) throw PatternMismatchError;
	name = processedName[0];

	let data = prepareTemplateData({ name });
	const resourcePath = `${destination}/src/components/${data.titleCaseName}`;

	try {
		checkIfFolderExists(resourcePath, data.titleCaseName);
	}
	catch (e) {
		runGenerator(data, { source, destination });
	}
};

const prepareTemplateData = ({ name }) => {
	let titleCaseName = v.titleCase(name).replace(/-/g,'');
	return {
		name,
		titleCaseName,
		componentName: titleCaseName
	};
};

const checkIfFolderExists = (resourcePath, titleCaseName) => {
	fs.accessSync(resourcePath, fs.constants.F_OK);
	console.error(`Folder for component ${titleCaseName} already exists. Please remove it and try again.`);
};

const runGenerator = (data, { source, destination }) => {
	const templatePath = 				`${source}/bin/generators/templates`;
	const resourcePath =				`${destination}/src/components/${data.titleCaseName}`;
	const type =								'component';
	const indexFileName = 			'index.js';
	const stylesFileName = 			'styles.module.scss';
	const indexTestFileName = 	'index.test.js';

	let index = 	load(`${templatePath}/${type}/${indexFileName}`).process(data);
	let styles = 	load(`${templatePath}/${type}/${stylesFileName}`).process(data);
	let indexTest = 	load(`${templatePath}/${type}/${indexTestFileName}`).process(data);

	save(`${resourcePath}/${indexFileName}`, index);
	save(`${resourcePath}/${stylesFileName}`, styles);
	save(`${resourcePath}/${indexTestFileName}`, indexTest);
};
