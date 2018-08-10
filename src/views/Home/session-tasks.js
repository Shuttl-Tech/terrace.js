import { put } from 'redux-saga/effects';
import { UNAUTHORIZED } from 'http-status-codes';
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
		// TODO: On your created project, remove the next two lines to make this task function correctly.
		return yield put(SESSION_FETCH_SUCCESS({ token: 'some-token' }));
		// noinspection UnreachableCodeJS
		const { session: { token: urlToken } } = store.getState();
		let token = urlToken || cookie.get('authToken');
		refreshSessionToken(token);
		removeQueryParams('authToken');

		let session = yield get(API.SESSION);

		return yield put(SESSION_FETCH_SUCCESS({ token: session.token }));
	}
	catch (e) {
		yield put(SESSION_FETCH_FAILURE());
		switch (parseInt(e.message, 10)) {
			case UNAUTHORIZED: throw new Error(UNAUTHORIZED);
			default: throw e;
		}
	}
}
