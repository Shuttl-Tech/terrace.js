import { ReactElementLike } from 'prop-types';

const ROUTE_PARAM_REGEX = /:([a-z](?:\w+)?|\?)+/ig;

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
export function transitionTo(ctx: ReactElementLike, route: string, ...params: string[]) : void {
	if (!ctx || (ctx && !ctx.props)) {
		throw new Error(`${ctx ? '`this`' : '`this.props`'} not found. Make sure to call this function in this way: \`transitionTo(this, <route>, ...<params>)\`.`);
	}
	if (!ctx.props.history) {
		throw new Error('History object not found in `this.props`.\nYou need to ensure that the component is exported using `withRouter` from `react-router-dom`.');
	}

	let transitionRoute = parametrizePath(route, ...params);
	ctx.props.history.push(transitionRoute);
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
 * @param {string} route
 * @param {arguments} params
 */
type ReplacerParams = {[key: string]: string };

export function parametrizePath(route: string, ...params: Array<string | number> | [ReplacerParams]) : string {
	if (params[0] && typeof params[0] === 'object') {
		let dictionary: ReplacerParams = params[0];
		return route.replace(ROUTE_PARAM_REGEX, (match) => dictionary[match.slice(1)] || match);
	}
	const stringParams = params as Array<string>;
	let replaceIndex = 0;
	return route.replace(ROUTE_PARAM_REGEX, (match) => stringParams[replaceIndex++] || match);
}
