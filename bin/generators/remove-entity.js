import v from 'voca';
import fs from 'file-system';

import { getProjectPaths, SUPPORTED_ENTITIES } from './utils/files';

export const removeEntity = ({ entity, name }) => {
	let { destination } = getProjectPaths();
	let supportedEntities = SUPPORTED_ENTITIES.map(e => e.slice(0, -1));

	try {
		if (!supportedEntities.includes(entity)) throw new Error('bad_entity');  // entities without the `s`
		let entityComponentName = v.titleCase(name).replace(/-/g, '');
		let path = `${destination}/src/${entity}s/${entityComponentName}`;  // added the `s` to entity
		console.log(`⏳ Removing ${entity} ${entityComponentName.underline}`.green.bold);
		fs.rmdirSync(path);
		console.log(`✅ Entity removed.`.green);
	}
	catch (e) {
		if (e.message === 'bad_entity') {
			return console.error(`⚠️  ${entity.bold.underline} is not a valid entity.`.red
				+ `\nSupported entities are: ${supportedEntities.map(e => e.underline.bold).join(', ')}`.yellow);
		}
		console.error(e);
	}
};
