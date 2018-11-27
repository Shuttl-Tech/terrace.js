export const SCHEMA = {
	GENERIC: "GENERIC",	// default case, we basically return the payload for this
};

/**
 * Transform incoming payloads to fit a model
 * @param {Object} payload
 * @param {String} schema
 */
export const serialize = (payload: string | Object, schema: string = SCHEMA.GENERIC) => {
	payload = typeof payload === 'string' ? JSON.parse(payload) : payload;

	switch(schema) {
		case SCHEMA.GENERIC: return serialize_GENERIC(payload);
		default: return payload;
	}
};

/**
 * Transform outgoing payloads to fit a model
 * @param {Object} payload
 * @param {String} schema
 */
export const normalize = (payload: Object, schema: string = SCHEMA.GENERIC) => {
	switch(schema) {
		case SCHEMA.GENERIC: return normalize_GENERIC(payload);
		default: return payload;
	}
};

export const serialize_GENERIC = (payload) => {
	return {...payload};
};

export const normalize_GENERIC = (payload) => {
	return {...payload};
};
