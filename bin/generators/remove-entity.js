import v from 'voca';
import fs from 'file-system';
import pluralize from 'pluralize';
const { plural, singular } = pluralize;

import { getProjectPaths, SUPPORTED_ENTITIES } from './utils/files';
import { CriticalError } from './utils/error-handlers';
import { BAD_ARGUMENT_PATTERN, MISSING_ARGUMENT } from './utils/error-codes';

export const removeEntity = ({ entity, name }) => {
	let supportedEntities = SUPPORTED_ENTITIES.map(singular);
	const supportedEntitiesMessage = `Supported entities are: ${supportedEntities.map(e => e.underline.bold).join(', ')}`.yellow;

	if (!entity) { CriticalError('🚨 Missing entity type.' + `\n${supportedEntitiesMessage}`, MISSING_ARGUMENT); }

	if (!supportedEntities.includes(entity)) CriticalError(`⚠️  ${entity.bold.underline} is not a valid entity.`.red + `\n${supportedEntitiesMessage}`, BAD_ARGUMENT_PATTERN);

	if (!name) { CriticalError(`🚨 Missing ${entity.toLowerCase()} name. Please specify dasherized ${entity.toLowerCase()} name.`, MISSING_ARGUMENT); }

	let { destination } = getProjectPaths();

	let entityComponentName = v.titleCase(name).replace(/-/g, '');
	let path = `${destination}/src/${plural(entity)}/${entityComponentName}`;

	console.log(`⏳ Removing ${entity} ${entityComponentName.underline}`.green.bold);
	fs.rmdirSync(path);
	console.log(`✅ Entity removed.`.green);
};
