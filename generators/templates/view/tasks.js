import { put } from 'redux-saga/effects';
import { UNAUTHORIZED } from 'http-status-codes';

import { get } from 'utils/http';
import API from 'apis';
import {
	___resourceName____FETCH_SUCCESS, ___resourceName____FETCH_FAILURE
} from './actions';

export function* ___fetchViewData___() {
	try {
		let data = yield get(API.DUMMY);
		return yield put(___resourceName____FETCH_SUCCESS({ data }));
	}
	catch (e) {
		yield put(___resourceName____FETCH_FAILURE());

		switch (e.message) {
			default: throw e;
		}
	}
}
