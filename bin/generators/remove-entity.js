import v from 'voca';
import { rmdirSync } from 'file-system';
import { unlinkSync, lstatSync } from 'fs';
import pluralize from 'pluralize';
const { plural, singular } = pluralize;

import { ENTITY, getProjectPaths, SUPPORTED_ENTITIES } from './utils/files';
import { CriticalError } from './utils/error-handlers';
import { BAD_ARGUMENT_PATTERN, MISSING_ARGUMENT } from './utils/error-codes';

export const removeEntity = ({ entity, name_or_subtype: nameOrSubtype, name }) => {
	let supportedEntities = SUPPORTED_ENTITIES.map(singular);
	const supportedEntitiesMessage = `Supported entities are: ${supportedEntities.map(e => e.underline.bold).join(', ')}`.yellow;

	if (!entity) { CriticalError('🚨 Missing entity type.' + `\n${supportedEntitiesMessage}`, MISSING_ARGUMENT); }

	if (!supportedEntities.includes(entity)) CriticalError(`⚠️  ${entity.bold.underline} is not a valid entity.`.red + `\n${supportedEntitiesMessage}`, BAD_ARGUMENT_PATTERN);

	let hasSubtype, subtype, isSingleJSFile;
	switch (entity) {
		case singular(ENTITY.MOCKS): hasSubtype = isSingleJSFile = true; break;
		default: break;
	}

	if (!hasSubtype) name = nameOrSubtype;
	else {
		subtype = nameOrSubtype;
		if (!subtype) { CriticalError(`🚨 Missing ${entity.toLowerCase()} subtype. Please specify dasherized ${entity.toLowerCase()} subtype.`, MISSING_ARGUMENT); }
	}

	if (!name) { CriticalError(`🚨 Missing ${entity.toLowerCase()} name. Please specify dasherized ${entity.toLowerCase()} name.`, MISSING_ARGUMENT); }

	let { destination } = getProjectPaths();

	let entityTargetName = hasSubtype ? name : v.titleCase(name).replace(/-/g, '');
	let path = `${destination}/src/${plural(entity)}`
		+ `${hasSubtype ? `/${plural(subtype)}` : ''}/${entityTargetName}`
		+ `${isSingleJSFile ? '.js' : ''}`;

	console.log(`⏳ Removing ${entity} ${entityTargetName.underline}`.green.bold);
	lstatSync(path).isDirectory() ? rmdirSync(path) : unlinkSync(path) ;
	console.log(`✅ Entity removed.`.green);
};
