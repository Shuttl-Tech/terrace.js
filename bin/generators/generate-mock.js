import v from 'voca';
import pluralize from 'pluralize';
import { keyInYN } from 'readline-sync';
const { plural, singular } = pluralize;
const { snakeCase, lowerCase } = v;

import {
  checkIfNamePatternIsCorrectOrTerminateProgram, getFilePathWithParents,
  getProjectPaths,
  load,
  save
} from './utils/files';
import { CriticalError } from './utils/error-handlers';
import { BAD_ARGUMENT_PATTERN, MISSING_ARGUMENT } from './utils/error-codes';
import { parseTemplateComments } from './utils/template-comments-parser';
import { existsSync } from 'fs';

export const MOCKABLE_ENTITIES = {
  RESOURCE: 'resource'
};

export const generateMock = ({ entity, name }) => {
  let supportedEntities = Object.keys(MOCKABLE_ENTITIES).map(singular).map(lowerCase);
  const supportedEntitiesMessage = `Supported entities are: ${supportedEntities.map(e => e.underline.bold).join(', ')}`.yellow;

  if (!entity) { CriticalError('🚨 Missing entity type.' + `\n${supportedEntitiesMessage}`, MISSING_ARGUMENT); }

  if (!supportedEntities.includes(entity)) CriticalError(`⚠️  ${entity.bold.underline} is not a valid entity.`.red + `\n${supportedEntitiesMessage}`, BAD_ARGUMENT_PATTERN);

  if (!name) { CriticalError(`🚨 Missing ${entity.toLowerCase()} name. Please specify dasherized ${entity.toLowerCase()} name.`, MISSING_ARGUMENT); }
  name = checkIfNamePatternIsCorrectOrTerminateProgram({ name });

  let { source, destination } = getProjectPaths();

  let templatePath = `${source}/bin/generators/templates/mocks/${plural(entity)}/generic.ts`;
  let resourcePath = `${destination}/src/mocks/${plural(entity)}`;
  let fileName = `${name}.ts`;

  if (existsSync(`${resourcePath}/${fileName}`)) {
  	let doOverwrite = keyInYN('⚠️  File already exists. Overwrite? [Y/N] ');
  	if (!doOverwrite) process.exit();
  }

  let mock = 	load(templatePath).process({ resourceName: snakeCase(name).toUpperCase() });
  mock = parseTemplateComments({ file: mock });
  save(`${resourcePath}/${fileName}`, mock);

  console.log('✅ Files created:'.bold.cyan.underline);
  console.log(getFilePathWithParents(`${resourcePath}/${fileName}`, 2));
};
