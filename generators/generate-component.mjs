import v from 'voca';
import { load, save } from "./utils/files";
import { PatternMismatchError } from './utils/errors';

export const generateComponent = ({ name }) => {
	if (!name) throw new Error('Missing Component Name. Please specify a component name.');
	let processedName = name.match(/^[a-z]([a-z0-9-]+)?/i);
	if (!processedName) throw PatternMismatchError;
	name = processedName[0];

	let data = prepareTemplateData({ name });
	const resourcePath = `./src/components/${data.titleCaseName}`;

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
	console.error(`Folder for component ${titleCaseName} already exists. Please remove it and try again.`);
};

const runGenerator = (data) => {
	const templatePath = 				'./generators/templates';
	const resourcePath =				`./src/components/${data.titleCaseName}`;
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
