import v from 'voca';
import { keys, values } from 'ramda';

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

export const generateComponent = ({ name, ...options }) => {
  let { source, destination } = getProjectPaths();

  if (!name) MissingHandlerName({ entity: 'component' });
  name = checkIfNamePatternIsCorrectOrTerminateProgram({ name });

  let data = prepareTemplateData({ name });
  let type = ENTITY.COMPONENTS;
  const resourcePath = `${destination}/src/${type}/${data.titleCaseName}`;

  let folderExists = checkIfFolderExistsOrTerminateProgram({ resourcePath, titleCaseName: data.titleCaseName, type });
  if (!folderExists) runGenerator(data, { source, destination, ...options });
};

const prepareTemplateData = ({ name }) => {
  let titleCaseName = v.titleCase(name).replace(/-/g,'');
  return {
  	name,
  	titleCaseName,
  	componentName: titleCaseName
  };
};

const runGenerator = (data, { source, destination, sfc, minimal, noIntl, pure }) => {
  const isMinimalSfc = minimal && sfc;

  const templatePath = 				`${source}/bin/generators/templates`;
  const resourcePath =				`${destination}/src/${ENTITY.COMPONENTS}/${data.titleCaseName}`;
  const type =								'component';
  const indexFileName = 			sfc ? 'sfc.index.tsx' : 'index.tsx';
  const stylesFileName = 			'styles.module.scss';
  const indexTestFileName = 	'index.test.tsx';

  let index = 	    load(`${templatePath}/${type}/${indexFileName}`).process(data);
  let styles = 	    isMinimalSfc ? null : load(`${templatePath}/${type}/${stylesFileName}`).process(data);
  let indexTest = 	isMinimalSfc ? null : load(`${templatePath}/${type}/${indexTestFileName}`).process(data);

  // Parse Index File comments
  index = parseTemplateComments({ tokens: ['complete-component'], file: index, invert: minimal });
  index = parseTemplateComments({ tokens: ['with-i18n'], file: index, invert: noIntl });
  index = parseTemplateComments({ tokens: ['pure-component'], file: index, invert: !pure });

  save(`${resourcePath}/index.tsx`, index);

  if (!isMinimalSfc) {
  	save(`${resourcePath}/${stylesFileName}`, styles);
  	save(`${resourcePath}/${indexTestFileName}`, indexTest);
  }

  const optionsIgnoredForSfcs = { noIntl, pure };
  if (sfc && values(optionsIgnoredForSfcs).reduce((a,b) => a || b)) {
  	console.log('⚠️ Flags ignored:'.bold.cyan.underline
  		+ ` ${keys(optionsIgnoredForSfcs).filter(key => optionsIgnoredForSfcs[key]).join(', ')}`.bold.magenta
  		+ '. Other flags (except --minimal) are ignored when the -s/--sfc flag is passed.`');
  }
  console.log('✅ Files created:'.bold.cyan.underline);
  console.log(getAllFilesInGeneratedDirectory(resourcePath));
};
