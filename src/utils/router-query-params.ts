import { parse, stringify } from 'query-string';

/**
 * @param queryParams
 */
export const removeQueryParams = (...queryParams: string[]) => {
  let { origin, pathname, search } = window.location;
  let history = window.history;

  let params = { ...parse(search) };
  queryParams.map(qp => delete params[qp]);
  let result = stringify(params);

  result = (result.length) ? `?${result}` : '';

  history.replaceState(history.state, document.title, `${origin}${pathname}${result}`)
};
