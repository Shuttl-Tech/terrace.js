import axios, { AxiosRequestConfig } from 'axios';
import { normalize, serialize } from 'adapters/application';
import { initializeRequestMocking } from 'mocks/requests';
import { getSessionToken } from 'utils/session';
import { ObjectUrl } from 'apis';
import { handleHTTPErrors } from 'utils/error-handlers';
import { SCHEMA } from 'adapters/adapter.types';
import { CustomOptionsProps, ModifyRequestOptionsProps } from 'utils/http.types';

export const NAMESPACE = 'api';
export const REQUEST_TIMEOUT = 30000;

const VERSION = 'v1';
const BASE = process.env.REACT_APP_API_BASE_URL;

export const namespacedUrl = (url: string) : string => `${BASE}/${NAMESPACE}/${VERSION}${url}`;
export const processedUrl = (url: ObjectUrl) : string => {
  if (typeof url === 'string') {
  	return namespacedUrl(url);
  }
  if (url.OVERRIDE_BASE) return url.URL;
  return namespacedUrl(url.URL);
};

export const doMockRequests = process.env.REACT_APP_MOCK_REQUESTS === 'true' || process.env.NODE_ENV === 'test';
if (doMockRequests) { initializeRequestMocking(); }

const handleRequestCore = async (url: ObjectUrl, options: AxiosRequestConfig) => {
  try {
  	const request = axios({ url: processedUrl(url), ...options });
  	const response = await request;
  	return response.data;
  }
  catch (err) {
  	handleHTTPErrors(err);
  	throw err;
  }
};

// Functions here are intended to return promises.
// Any async/await or similar handling should be done at a level higher than here.

/**
 * Return `fetch` API resource.
 * @param {ObjectUrl} url
 * @param {object} options
 * @returns {Promise<Response>} response
 */
export const getRaw = (url: ObjectUrl, options: object = {}): Promise<Response> => {
  return fetch(processedUrl(url), { credentials: 'include', ...options }).then(response => {
  	try {
  		if (!response.ok)	throw Object({status: response.status, data: response});
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
 * @param {ObjectUrl} url
 * @param {object} options
 * @param {SCHEMA} schema
 * @returns {Promise<{ data: T }>} response
 */
export async function get<T>(url: ObjectUrl, options = {}, schema = SCHEMA.GENERIC): Promise<{ data: T }> {
  options = modifyRequestOptions({ ...options, method: 'get' }, schema);
  return await handleRequestCore(url, options);
}
/**
 * Return `axios` API resource.
 * https://github.com/axios/axios#response-schema
 * @param {ObjectUrl} url
 * @param {object} options
 * @param {SCHEMA} schema
 * @returns {Promise<{ data: T }>} response
 */
export async function post<T>(url: ObjectUrl, options = {}, schema = SCHEMA.GENERIC): Promise<{ data: T }> {
  options = modifyRequestOptions({ ...options, method: 'post' }, schema);
  return await handleRequestCore(url, options);
}
/**
 * Return `axios` API resource.
 * https://github.com/axios/axios#response-schema
 * @param {ObjectUrl} url
 * @param {object} options
 * @param {SCHEMA} schema
 * @returns {Promise<{ data: T }>} response
 */
export async function put<T>(url: ObjectUrl, options = {}, schema = SCHEMA.GENERIC): Promise<{ data: T }> {
  options = modifyRequestOptions({ ...options, method: 'put' }, schema);
  return await handleRequestCore(url, options);
}
/**
 * Return `axios` API resource.
 * https://github.com/axios/axios#response-schema
 * @param {ObjectUrl} url
 * @param {object} options
 * @param {SCHEMA} schema
 * @returns {Promise<{ data: T }>} response
 */
export async function patch<T>(url: ObjectUrl, options = {}, schema = SCHEMA.GENERIC): Promise<{ data: T }> {
  options = modifyRequestOptions({ ...options, method: 'patch' }, schema);
  return await handleRequestCore(url, options);
}
// Other utility functions
/**
 * Modify all request options, such as headers, mode, credentials, body, etc.
 *
 * For more details on options, see: https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch
 * @param {object} options Has an additional non-standard `formData: Boolean` property, deleted before flight.
 * @param {SCHEMA} schema
 * @returns {object} `fetch` options
 */
function modifyRequestOptions(options: ModifyRequestOptionsProps = {}, schema: SCHEMA = SCHEMA.GENERIC): AxiosRequestConfig {

  let headers = modifyRequestHeaders(options || {});

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
  	transformRequest: [...axios.defaults.transformRequest, (data: object) => {
  		return normalize(data, schema, options);
  	}],
  	transformResponse: [...axios.defaults.transformResponse, (data: any) => {
  		return serialize(data, schema, options);
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
 * @param {object} options
 */
function modifyRequestHeaders(options: CustomOptionsProps = {}): {} {
  let headers;
  if (options.formData) {
  	headers = {...options.headers, 'Content-Type': 'application/x-www-form-urlencoded' };
  }
  headers = {...headers,
  	'x-session-id': getSessionToken()
  };
  return {...headers};
}
