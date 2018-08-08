import axios from 'axios';
import { SCHEMA, normalize, serialize } from 'adapters/application';

// Functions here are intended to return promises.
// Any async/await or similar handling should be done at a level higher than here.

// We don't need the namespacing here because we can pass in proxy to package.json.
// export const NAMESPACE = "https://qasupply.goplus.in";
export const NAMESPACE = "";
export const REQUEST_TIMEOUT = 30000;

const namespacedUrl = (url) => NAMESPACE + url;

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
	options = modifyRequestOptions(options, schema);
	let response = await axios.request({ url: namespacedUrl(url), method: 'get', ...options });
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
	options = modifyRequestOptions(options, schema);
	let response = await axios.request({ url: namespacedUrl(url), method: 'post', ...options });
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

	let headers = modifyRequestHeaders(options || {});

	options = {...options, body: normalize(options.body, schema) };

	delete options.formData;	// non-standard optional property
	delete options.body;	// option doesn't exist on axios lib, did on `fetch`

	return {...options,
		headers,
		withCredentials: true,
		data: options.body,
		params: options.body,
		transformRequest: [...axios.defaults.transformRequest, (data) => {
			return normalize(data, schema);
		}],
		transformResponse: [...axios.defaults.transformResponse, (data) => {
			return serialize(data, schema);
		}],
		timeout: REQUEST_TIMEOUT
	};
}

/**
 * Modify all request headers.
 *
 * For more details on headers, see: https://developer.mozilla.org/en-US/docs/Web/API/Headers
 * @param {object} headers
 * @returns {object} request headers
 */
function modifyRequestHeaders(options: {} = {}): {} {
	let headers;
	if (options.formData) {
		headers = {...options.headers, "Content-Type": "application/x-www-form-urlencoded" };
	}
	return {...headers,
		// "Cookie": document.cookie
	};
}
