import v from 'voca';
import { load, save } from "./utils/files";

export const generateView = ({ name }) => {
	let processedName = name.match(/^[a-z]([a-z0-9-]+)?/i);
	if (!processedName) throw new Error('Route name doesn\'t fit pattern. It must be a single dasherized string.');
	name = processedName[0];

	let data = prepareTemplateData({ name });
	const resourcePath = `./src/views/${data.titleCaseName}`;

	try {
		checkIfFolderExists(resourcePath, data.titleCaseName);
	}
	catch (e) {
		runGenerator(data);
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
	console.error(`Folder for view ${titleCaseName} already exists. Please remove it and try again.`);
};

const runGenerator = (data) => {
	const templatePath = 				'./generators/templates';
	const resourcePath =				`./src/views/${data.titleCaseName}`;
	const type =								'view';
	const indexFileName = 			'index.js';
	const actionsFileName = 		'actions.js';
	const reducerFileName = 		'reducer.js';
	const tasksFileName = 			'tasks.js';
	const stylesFileName = 			'styles.js';
	const indexTestFileName = 	'indexTest.js';
	const reducerTestFileName = 'reducerTest.js';

	let index = 	load(`${templatePath}/${type}/${indexFileName}`).process(data);
	let actions = load(`${templatePath}/${type}/${actionsFileName}`).process(data);
	let reducer = 	load(`${templatePath}/${type}/${reducerFileName}`).process(data);
	let tasks = 	load(`${templatePath}/${type}/${tasksFileName}`).process(data);
	let styles = 	load(`${templatePath}/${type}/${stylesFileName}`).process(data);

	let indexTest = 	load(`${templatePath}/${type}/${indexTestFileName}`).process(data);
	let reducerTest = 	load(`${templatePath}/${type}/${reducerTestFileName}`).process(data);

	save(`${resourcePath}/${type}/${indexFileName}`, index);
	save(`${resourcePath}/${type}/${actionsFileName}`, actions);
	save(`${resourcePath}/${type}/${reducerFileName}`, reducer);
	save(`${resourcePath}/${type}/${tasksFileName}`, tasks);
	save(`${resourcePath}/${type}/${stylesFileName}`, styles);

	save(`${resourcePath}/${type}/${indexTestFileName}`, indexTest);
	save(`${resourcePath}/${type}/${reducerTestFileName}`, reducerTest);
};
