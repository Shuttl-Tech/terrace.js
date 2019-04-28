import { ModifyRequestOptionsProps } from 'utils/http.types';
import { SCHEMA } from 'adapters/adapter.types';

/**
 * Transform incoming payloads to fit a model
 * @param {Object} payload
 * @param {String} schema
 */
export const serialize = (payload: any, schema: SCHEMA, options: ModifyRequestOptionsProps): object => {
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
export const normalize = (payload: any, schema: SCHEMA, options: ModifyRequestOptionsProps): object  => {
	switch(schema) {
		case SCHEMA.GENERIC: return normalize_GENERIC(payload);
		default: return payload;
	}
};

export const serialize_GENERIC = (payload: object) => payload;

export const normalize_GENERIC = (payload: object) => payload;
