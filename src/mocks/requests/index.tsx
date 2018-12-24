import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

import API from 'apis';
import { SESSION } from '../resources/session';
import { GENERIC } from '../resources/generic';

export const initializeRequestMocking = () => {
	const mockAdapter = new MockAdapter(axios);

	mockAdapter.onGet(API.SESSION).reply(() => [200, SESSION]);

	// NOTE: This must be the last handler, same for wildcard handlers for any HTTP verb.
	mockAdapter.onGet(/.*/).reply(config => [200, GENERIC]); // eslint-disable-line
};
