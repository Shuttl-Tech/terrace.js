import { parse, stringify } from 'query-string';

/**
 * @param {...String} queryNames
 */
export const removeQueryParams = (...queryParams) => {
	let { origin, pathname, search } = window.location;
	let history = window.history;

	let params = parse(search);
	queryParams.map(qp => delete params[qp]);
	params = stringify(params);

	params = (params.length) ? `?${params}` : '';

	history.replaceState(history.state, document.title, `${origin}${pathname}${params}`)
};
