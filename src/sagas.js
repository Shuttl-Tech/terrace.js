import { takeLatest } from 'redux-saga/effects';

import { ACTIONS } from 'views/Home/session-actions';

import * as Session from 'views/Home/session-tasks';

const sagas = [
	function * watchSessionRequests () {
		yield takeLatest(ACTIONS.SESSION_FETCH_REQUEST, Session.validateToken)
	}
]

export default sagas;
