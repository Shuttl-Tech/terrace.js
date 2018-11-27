import axios from 'axios';
import { SCHEMA, normalize, serialize } from 'adapters/application';
import { initializeRequestMocking } from 'mocks/requests';

export const NAMESPACE = '';
export const REQUEST_TIMEOUT = 30000;

const namespacedUrl = (url) => NAMESPACE + url;

const doMockRequests = process.env.REACT_APP_MOCK_REQUESTS === 'true' || process.env.NODE_ENV === 'test';
if (doMockRequests) { initializeRequestMocking(); }

// Functions here are intended to return promises.
// Any async/await or similar handling should be done at a level higher than here.

/**
 * Return `fetch` API resource.
 * @param {String} url
 * @param options
 * @returns {Promise} `Promise<Response>`
 */
export const getRaw = (url: string, options: Object = {}): Promise<Response> => {
	return fetch(namespacedUrl(url), { credentials: 'include', ...options }).then(response => {
		try {
			if (!response.ok)	return Promise.reject({status: response.status, data: response});
		}
		catch (e) {
			// do nothing as such
			console.error(e);
		}
		return response;
	});
};

/**
 * Return `axios` API resource.
 * https://github.com/axios/axios#response-schema
 * @param {String} url
 * @param {Object} options
 * @param {String} schema
 * @returns {Promise} `Promise<Response>`
 */
export const get = async (url: string, options: Object = {}, schema: string = SCHEMA.GENERIC): Promise<Response> => {
	options = modifyRequestOptions({ ...options, method: 'get' }, schema);
	let response = await axios({ url: namespacedUrl(url), ...options });
	return response.data;
};

/**
 * Return `axios` API resource.
 * https://github.com/axios/axios#response-schema
 * @param {String} url
 * @param {Object} options
 * @param {String} schema
 * @returns {Promise} `Promise<Response>`
 */
export const post = async (url: string, options: Object = {}, schema: string = SCHEMA.GENERIC): Promise<Response> => {
	options = modifyRequestOptions({ ...options, method: 'post' }, schema);
	let response = await axios({ url: namespacedUrl(url), ...options });
	return response.data;
};

/**
 * Return `axios` API resource.
 * https://github.com/axios/axios#response-schema
 * @param {String} url
 * @param {Object} options
 * @param {String} schema
 * @returns {Promise} `Promise<Response>`
 */
export const put = async (url: string, options: Object = {}, schema: string = SCHEMA.GENERIC): Promise<Response> => {
	options = modifyRequestOptions({ ...options, method: 'put' }, schema);
	let response = await axios({ url: namespacedUrl(url), ...options });
	return response.data;
};

/**
 * Return `axios` API resource.
 * https://github.com/axios/axios#response-schema
 * @param {String} url
 * @param {Object} options
 * @param {String} schema
 * @returns {Promise} `Promise<Response>`
 */
export const patch = async (url: string, options: Object = {}, schema: string = SCHEMA.GENERIC): Promise<Response> => {
	options = modifyRequestOptions({ ...options, method: 'patch' }, schema);
	let response = await axios({ url: namespacedUrl(url), ...options });
	return response.data;
};

// Other utility functions
/**
 * Modify all request options, such as headers, mode, credentials, body, etc.
 *
 * For more details on options, see: https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch
 * @param {Object} options Has an additional non-standard `formData: Boolean` property, deleted before flight.
 * @param {String} schema
 * @returns {object} `fetch` options
 */
function modifyRequestOptions(options: Object = {}, schema: string = SCHEMA.GENERIC): {} {
	const headers = modifyRequestHeaders(options || {});

	delete options.formData;	// non-standard optional property

	let isGet = options.method === 'get';
	if (isGet) {
		options = { ...options, params: options.body }
	} else {
		options = { ...options, data: options.body }
	}
	delete options.body;  // non-standard optional property

	return {
		headers,
		withCredentials: true,
		transformRequest: [...axios.defaults.transformRequest, (data) => {
			return normalize(data, schema);
		}],
		transformResponse: [...axios.defaults.transformResponse, (data) => {
			return serialize(data, schema);
		}],
		timeout: REQUEST_TIMEOUT,
		...options
	};
}

/**
 * Modify all request headers.
 *
 * For more details on headers, see: https://developer.mozilla.org/en-US/docs/Web/API/Headers
 * @returns {object} request headers
 * @param options
 */
function modifyRequestHeaders(options: {} = {}): {} {
	let headers;
	if (options.formData) {
		headers = {...options.headers, "Content-Type": "application/x-www-form-urlencoded" };
	}
	return {...headers};
}
