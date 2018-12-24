import { removeQueryParams } from '../router-query-params';

it('removes query-params correctly', () => {
	window.history.pushState({}, 'Query Params Test', '/path/subpath?query=true');
	removeQueryParams('hello', 'query');
	expect(window.location.search.length).toEqual(0);

	window.history.pushState({}, 'Query Params Test', '/path/subpath?query=true');
	removeQueryParams('hello');
	expect(window.location.search).toEqual('?query=true');

	window.history.pushState({}, 'Query Params Test', '/path/subpath?query=true&somekey=someval');
	removeQueryParams('query');
	expect(window.location.search).toEqual('?somekey=someval');

	window.history.pushState({}, 'Query Params Test', '/path/subpath?query=true&somekey=someval&abc=def');
	removeQueryParams('somekey');
	expect(window.location.search).toEqual('?abc=def&query=true');

	window.history.pushState({}, 'Query Params Test', '/path/subpath?query=true&somekey=someval&abc=def&pc=masterrace');
	removeQueryParams('somekey', 'pc');
	expect(window.location.search).toEqual('?abc=def&query=true');
});
