export const SCHEMA = {
	GENERIC: "GENERIC",	// default case, we basically return the payload for this
};

/**
 * Transform incoming payloads to fit a model
 * @param {Object} payload
 * @param {String} schema
 */
export const serialize = (payload: Object, schema: string = SCHEMA.GENERIC) => {
	switch(schema) {
		case SCHEMA.GENERIC: return payload;
		default: return payload;
	}
}

/**
 * Transform outgoing payloads to fit a model
 * @param {Object} payload
 * @param {String} schema
 */
export const normalize = (payload: Object, schema: string = SCHEMA.GENERIC) => {
	switch(schema) {
		case SCHEMA.GENERIC: return payload;
		default: return payload;
	}
}
