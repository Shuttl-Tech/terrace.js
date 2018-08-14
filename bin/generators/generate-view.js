import v from 'voca';
import { getProjectRoot, load, save } from "./utils/files";
import { PatternMismatchError } from './utils/errors';
import { spawnSync } from "child_process";
import _fs from "fs";
import { parseTemplateComments } from "./utils/template-comments-parser";

export const generateView = ({ name, reducerName, withoutReducer }) => {
	const terracePackage = spawnSync('which', ['terrace']).stdout.toString().slice(0, -1);	// Removed newline at the end of output
	const destination = getProjectRoot();	// Destination Project Root path
	const source = getProjectRoot(_fs.realpathSync(terracePackage));	// Project Root path

	if (!name) throw new Error('Missing View Name. Please specify a view name.');
	let processedName = name.match(/^[a-z]([a-z0-9-]+)?/i);
	if (!processedName) throw new PatternMismatchError;
	name = processedName[0];

	let data = prepareTemplateData({ name, reducerName });
	const resourcePath = `${destination}/src/components/${data.titleCaseName}`;

	try {
		checkIfFolderExists(resourcePath, data.titleCaseName);
	}
	catch (e) {
		runGenerator(data, { reducerName: data.lowerCaseResourceName, withoutReducer, name, source, destination });
	}
};

const prepareTemplateData = ({ name, reducerName }) => {
	let titleCaseName = v.titleCase(name).replace(/-/g,'');
	let _resourceName = reducerName || name;
	let resourceName = v.upperCase(_resourceName).replace(/-/g,'_');
	let lowerCaseResourceName = v.lowerCase(_resourceName);
	return {
		name,
		titleCaseName,
		componentName: titleCaseName,
		resourceName,
		lowerCaseResourceName
	};
};

const checkIfFolderExists = (resourcePath, titleCaseName) => {
	fs.accessSync(resourcePath, fs.constants.F_OK);
	console.error(`Folder for view ${titleCaseName} already exists. Please remove it and try again.`);
};

const runGenerator = (data, { reducerName, withoutReducer, source, destination }) => {
	const templatePath = 				`${source}/bin/generators/templates`;
	const resourcePath =				`${destination}/src/views/${data.titleCaseName}`;
	const type =								'view';
	const indexFileName = 			'index.js';
	const actionsFileName = 		'actions.js';
	const reducerFileName = 		'reducer.js';
	const tasksFileName = 			'tasks.js';
	const stylesFileName = 			'styles.module.scss';
	const testsDir = 						'__tests__';
	const indexTestFileName = 	'index.test.js';
	const reducerTestFileName = 'reducer.test.js';

	let index = 	load(`${templatePath}/${type}/${indexFileName}`).process(data);
	let styles = 	load(`${templatePath}/${type}/${stylesFileName}`).process(data);
	let indexTest = 	load(`${templatePath}/${type}/${testsDir}/${indexTestFileName}`).process(data);

	index = parseTemplateComments({ tokens: ['reducer-snippets'], file: index, invert: withoutReducer });
	indexTest = parseTemplateComments({ tokens: ['reducer-snippets'], file: indexTest, invert: withoutReducer });

	save(`${resourcePath}/${indexFileName}`, index);
	save(`${resourcePath}/${stylesFileName}`, styles);
	save(`${resourcePath}/${testsDir}/${indexTestFileName}`, indexTest);

	if (withoutReducer) return;

	let actions = load(`${templatePath}/${type}/${actionsFileName}`).process(data);
	let reducer = 	load(`${templatePath}/${type}/${reducerFileName}`).process(data);
	let tasks = 	load(`${templatePath}/${type}/${tasksFileName}`).process(data);
	let reducerTest = 	load(`${templatePath}/${type}/${testsDir}/${reducerTestFileName}`).process(data);

	save(`${resourcePath}/${reducerName + '-' || ''}${actionsFileName}`, actions);
	save(`${resourcePath}/${reducerName + '-' || ''}${reducerFileName}`, reducer);
	save(`${resourcePath}/${reducerName + '-' || ''}${tasksFileName}`, tasks);
	save(`${resourcePath}/${testsDir}/${reducerName + '-' || ''}${reducerTestFileName}`, reducerTest);
};
