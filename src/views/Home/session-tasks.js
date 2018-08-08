import { put } from 'redux-saga/effects';
import { UNAUTHORIZED } from 'http-status-codes';
import cookie from 'js-cookie';

import { getRaw } from 'utils/http';
import { refreshSessionToken } from 'utils/session';
import { removeQueryParams } from 'utils/router-query-params';
import { store } from 'index';
import API from 'apis';
import {
	SESSION_FETCH_SUCCESS, SESSION_FETCH_FAILURE
} from './session-actions';

export function* validateToken() {
	const SSO_URL = `http://qa.sso.goplus.in:8080/login?targetUrl=${window.location.origin}${window.location.pathname}`;

	return yield put(SESSION_FETCH_SUCCESS({ token: '123' })); // NOTE: Remove this line to get this function to work.

	// noinspection UnreachableCodeJS
	try { // eslint-disable-line no-unreachable
		const { session: { token: urlToken } } = store.getState();
		let token = urlToken || cookie.get('authToken');
		refreshSessionToken(token);
		removeQueryParams('authToken');

		let session = yield getRaw(API.SESSION);

		if (session.redirected) throw Error(UNAUTHORIZED);	// FIXME: API needs to return appropriate status code.

		return yield put(SESSION_FETCH_SUCCESS({ token }));
	}
	catch (e) {
		console.log(e.code, e.message, e.type, e.name);
		switch (parseInt(e.message, 10)) {
			case UNAUTHORIZED: window.location.href = SSO_URL; break;
			default: throw e;
		}
		return yield put(SESSION_FETCH_FAILURE());
	}
}
