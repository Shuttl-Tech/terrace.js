import v from 'voca';
import { load, save } from "./utils/files";
import { PatternMismatchError } from './utils/errors';

export const generateView = ({ name, reducerName }) => {
	if (!name) throw new Error('Missing View Name. Please specify a view name.');
	let processedName = name.match(/^[a-z]([a-z0-9-]+)?/i);
	if (!processedName) throw new PatternMismatchError;
	name = processedName[0];

	let data = prepareTemplateData({ name, reducerName });
	const resourcePath = `./src/components/${data.titleCaseName}`;

	try {
		checkIfFolderExists(resourcePath, data.titleCaseName);
	}
	catch (e) {
		runGenerator(data, { reducerName });
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

const runGenerator = (data, { reducerName }) => {
	const templatePath = 				'./generators/templates';
	const resourcePath =				`./src/components/${data.titleCaseName}`;
	const type =								'component';
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

	let actions = load(`${templatePath}/${type}/${actionsFileName}`).process(data);
	let reducer = 	load(`${templatePath}/${type}/${reducerFileName}`).process(data);
	let tasks = 	load(`${templatePath}/${type}/${tasksFileName}`).process(data);

	let indexTest = 	load(`${templatePath}/${type}/${testsDir}/${indexTestFileName}`).process(data);
	let reducerTest = 	load(`${templatePath}/${type}/${testsDir}/${reducerTestFileName}`).process(data);

	save(`${resourcePath}/${indexFileName}`, index);
	save(`${resourcePath}/${stylesFileName}`, styles);

	save(`${resourcePath}/${reducerName + '-' || ''}${actionsFileName}`, actions);
	save(`${resourcePath}/${reducerName + '-' || ''}${reducerFileName}`, reducer);
	save(`${resourcePath}/${reducerName + '-' || ''}${tasksFileName}`, tasks);

	save(`${resourcePath}/${testsDir}/${indexTestFileName}`, indexTest);
	save(`${resourcePath}/${testsDir}/${reducerName + '-' || ''}${reducerTestFileName}`, reducerTest);
};
