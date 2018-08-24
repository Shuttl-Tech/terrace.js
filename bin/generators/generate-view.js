import v from 'voca';
import {
	checkIfFolderExists,
	getProjectPaths,
	load,
	getAllFilesInGeneratedDirectory,
	save,
	ENTITY
} from './utils/files';
import { MissingHandlerName, PatternMismatchError } from './utils/error-handlers';
import { parseTemplateComments } from './utils/template-comments-parser';

export const generateView = ({ name, reducerName, withoutReducer }) => {
	let { source, destination } = getProjectPaths();

	if (!name) MissingHandlerName({ entity: 'view' });
	let processedName = name.match(/^[a-z]([a-z0-9-]+)?/i);
	if (!processedName) PatternMismatchError();
	name = processedName[0];

	let data = prepareTemplateData({ name, reducerName });
	let type = ENTITY.VIEWS;
	const resourcePath = `${destination}/src/${type}/${data.titleCaseName}`;

	let folderExists = checkIfFolderExists({ resourcePath, titleCaseName: data.titleCaseName, type });
	if (!folderExists) runGenerator(data, { reducerName: data.lowerCaseResourceName, withoutReducer, name, source, destination });
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

const runGenerator = (data, { reducerName, withoutReducer, source, destination }) => {
	const templatePath = 				`${source}/bin/generators/templates`;
	const resourcePath =				`${destination}/src/${ENTITY.VIEWS}/${data.titleCaseName}`;
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

	if (!withoutReducer) {
		let actions = load(`${templatePath}/${type}/${actionsFileName}`).process(data);
		let reducer = 	load(`${templatePath}/${type}/${reducerFileName}`).process(data);
		let tasks = 	load(`${templatePath}/${type}/${tasksFileName}`).process(data);
		let reducerTest = 	load(`${templatePath}/${type}/${testsDir}/${reducerTestFileName}`).process(data);

		save(`${resourcePath}/${reducerName + '-' || ''}${actionsFileName}`, actions);
		save(`${resourcePath}/${reducerName + '-' || ''}${reducerFileName}`, reducer);
		save(`${resourcePath}/${reducerName + '-' || ''}${tasksFileName}`, tasks);
		save(`${resourcePath}/${testsDir}/${reducerName + '-' || ''}${reducerTestFileName}`, reducerTest);
	}

	console.log('✅ Files created:'.bold.cyan.underline);
	console.log(getAllFilesInGeneratedDirectory(resourcePath));
};
