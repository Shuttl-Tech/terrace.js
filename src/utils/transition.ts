import { CompositeUrl, ObjectUrl } from 'apis';
import { History } from 'history';

const ROUTE_PARAM_REGEX = /:([a-z](?:\w+)?|\?)+/ig;


const HISTORY_INSTANCE_PROP = 'applicationHistoryInstance';

export const getHistoryInstance = (): History => {
	// @ts-ignore -- too trivial to bother typing this
	return window[HISTORY_INSTANCE_PROP];
};

export const setHistoryInstance = (history: History) => {
	// @ts-ignore -- too trivial to bother typing this
	return window[HISTORY_INSTANCE_PROP] = history;
};

/**
 * Transition to a specified route.
 * Specify route params as arguments.
 * When calling this function, do this: `transitionTo(this, <route>, ...<params>)`
 *
 * Also ensure that the component is exported using `withRouter` from `react-router-dom`.
 * @param {ReactElementLike} ctx
 * @param {string} route
 * @param params
 */
export function transitionTo(route: string, ...params: string[]) : void {
	const history = getHistoryInstance();
	if (!history) throw new Error('Ensure that history instance has been initialised, because it was not.');
	let transitionRoute = parametrizePath(route, ...params);
	history.push(transitionRoute);
}

/**
 * Turn a PARAMETRIZED_ROUTE (or a pattern matched string) into a route with params baked into it.
 * Example: `/path/:param1/subpath/:param2`, with params `hello`, and `world`,
 * will turn into `/path/hello/subpath/world`.
 *
 * If fewer params are passed than what the route can support, the extra route-params are ignored.
 * Example: `/path/:param1/subpath/:param2`, with params `just-this`,
 * will turn into `/path/just-this/subpath/:param2`.
 *
 * If more params are passed than what the route can support, they are ignored
 * and the output is the same as the `/path/hello/subpath/world` example.
 * Ideally, we can just append them to the path after `join`ing them with `/`.
 *
 * @param {ObjectUrl} route
 * @param {arguments} params
 */
type ReplacerParams = {[key: string]: string };

export function parametrizePath(path: string, ...params: Array<string | number> | [ReplacerParams]) : string;
export function parametrizePath(path: CompositeUrl, ...params: Array<string | number> | [ReplacerParams]) : CompositeUrl;
export function parametrizePath(path: ObjectUrl, ...params: Array<string | number> | [ReplacerParams]) : ObjectUrl {
	let stringPath: string = path as string;
	let parametrizedPath = '';
	const pathIsCompositeUrl = typeof path === 'object';

	if (pathIsCompositeUrl) {
		stringPath = (path as CompositeUrl).URL as string;
	}

	if (params[0] && typeof params[0] === 'object') {
		let dictionary: ReplacerParams = params[0];
		parametrizedPath = stringPath.replace(ROUTE_PARAM_REGEX, (match) => dictionary[match.slice(1)] || match);
	} else {
		const stringParams = params as Array<string>;
		let replaceIndex = 0;
		parametrizedPath = stringPath.replace(ROUTE_PARAM_REGEX, (match) => stringParams[replaceIndex++] || match);
	}

	if (pathIsCompositeUrl) {
		return { ...(path as CompositeUrl),
			URL: parametrizedPath
		};
	}

	return parametrizedPath;
}
