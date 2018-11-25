import { put } from 'redux-saga/effects';
import cookie from 'js-cookie';

import { get } from 'utils/http';
import { refreshSessionToken } from 'utils/session';
import { removeQueryParams } from 'utils/router-query-params';
import { store } from 'index';
import API from 'apis';
import {
	SESSION_FETCH_SUCCESS, SESSION_FETCH_FAILURE
} from './session-actions';

export function* validateToken() {
	// This was made for a system that returned the auth token in the window URL.
	// Replace this with your logic.
	// This logic receives the authToken value from the query param, and then removes it from the URL.
	try {
		// TODO: On your created project, remove the next two lines (and eslint-disable-line comment) to make this task function correctly.
		const { session: { token: urlToken } } = store.getState();
		let token = urlToken || cookie.get('authToken');
		refreshSessionToken(token);
		removeQueryParams('authToken');

		let session = yield get(API.SESSION);

		return yield put(SESSION_FETCH_SUCCESS({ token: session.token }));
	}
	catch (e) {
		console.error(e);
		return yield put(SESSION_FETCH_FAILURE());
	}
}
