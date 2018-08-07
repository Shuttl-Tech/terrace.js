const ROUTE_PARAM_REGEX = /:(\w|\?)+/ig;

/**
 * Transition to a specified route.
 * Specify route params as arguments.
 * When calling this function, do this: `transitionTo.call(this, <route>, ...<params>)`
 *
 * Also ensure that the component is exported using `withRouter` from `react-router-dom`.
 * @param {string} route
 */
export function transitionTo(route: string, ...params: string) : void {
	if (!this || (this && !this.props)) {
		throw new Error(`${this ? '`this`' : '`this.props`'} not found. Make sure to call this function in this way: \`transitionTo.call(this, <route>, ...<params>)\`.`);
	}
	if (!this.props.history) {
		throw new Error("History object not found in `this.props`.\nYou need to ensure that the component is exported using `withRouter` from `react-router-dom`.");
	}

	let transitionRoute = parametrizePath(route, ...params);
	this.props.history.push(transitionRoute);
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
export function parametrizePath(route: string, ...params: rest_array) : string {
	let replaceIndex = 0;
	let transitionRoute = route.replace(ROUTE_PARAM_REGEX, (match) => params[replaceIndex++] || match);
	return transitionRoute;
}
