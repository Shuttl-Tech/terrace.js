import { takeLatest } from 'redux-saga/effects';

import { ACTIONS as SESSION_ACTIONS } from 'views/Home/session-actions';

import * as Session from 'views/Home/session-tasks';

const sagas = [
	function * watchSessionRequests () {
		yield takeLatest(SESSION_ACTIONS.SESSION_FETCH_REQUEST, Session.validateToken)
	}
];

export default sagas;
