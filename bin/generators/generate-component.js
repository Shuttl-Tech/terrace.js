import v from 'voca';
import {
	checkIfFolderExistsOrTerminateProgram,
	getProjectPaths,
	load,
	getAllFilesInGeneratedDirectory,
	save,
	ENTITY, checkIfNamePatternIsCorrectOrTerminateProgram
} from './utils/files';
import { MissingHandlerName } from './utils/error-handlers';
import { parseTemplateComments } from './utils/template-comments-parser';

export const generateComponent = ({ name, minimal }) => {
	let { source, destination } = getProjectPaths();

	if (!name) MissingHandlerName({ entity: 'component' });
	name = checkIfNamePatternIsCorrectOrTerminateProgram({ name });

	let data = prepareTemplateData({ name });
	let type = ENTITY.COMPONENTS;
	const resourcePath = `${destination}/src/${type}/${data.titleCaseName}`;

	let folderExists = checkIfFolderExistsOrTerminateProgram({ resourcePath, titleCaseName: data.titleCaseName, type });
	if (!folderExists) runGenerator(data, { source, destination, minimal });
};

const prepareTemplateData = ({ name }) => {
	let titleCaseName = v.titleCase(name).replace(/-/g,'');
	return {
		name,
		titleCaseName,
		componentName: titleCaseName
	};
};

const runGenerator = (data, { source, destination, minimal }) => {
	const templatePath = 				`${source}/bin/generators/templates`;
	const resourcePath =				`${destination}/src/${ENTITY.COMPONENTS}/${data.titleCaseName}`;
	const type =								'component';
	const indexFileName = 			'index.js';
	const stylesFileName = 			'styles.module.scss';
	const indexTestFileName = 	'index.test.js';

	let index = 	load(`${templatePath}/${type}/${indexFileName}`).process(data);
	let styles = 	load(`${templatePath}/${type}/${stylesFileName}`).process(data);
	let indexTest = 	load(`${templatePath}/${type}/${indexTestFileName}`).process(data);

	index = parseTemplateComments({ tokens: ['complete-component'], file: index, invert: minimal });

	save(`${resourcePath}/${indexFileName}`, index);
	save(`${resourcePath}/${stylesFileName}`, styles);
	save(`${resourcePath}/${indexTestFileName}`, indexTest);

	console.log('✅ Files created:'.bold.cyan.underline);
	console.log(getAllFilesInGeneratedDirectory(resourcePath));
};
