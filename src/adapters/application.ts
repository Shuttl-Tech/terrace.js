export enum SCHEMA {
	GENERIC = 'GENERIC',	// default case, we basically return the payload for this
}

/**
 * Transform incoming payloads to fit a model
 * @param {Object} payload
 * @param {String} schema
 */
export const serialize = (payload: any, schema: SCHEMA = SCHEMA.GENERIC): object => {
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
export const normalize = (payload: object, schema: SCHEMA = SCHEMA.GENERIC): object  => {
	switch(schema) {
		case SCHEMA.GENERIC: return normalize_GENERIC(payload);
		default: return payload;
	}
};

export const serialize_GENERIC = (payload: object) => payload;

export const normalize_GENERIC = (payload: object) => payload;
