import { put } from 'redux-saga/effects';
import { UNAUTHORIZED } from 'http-status-codes';

import { get } from 'utils/http';
import API from 'src/apis';
import {
	___resourceName____FETCH_SUCCESS, ___resourceName____FETCH_FAILURE
} from './___lowerCaseResourceName___-actions';

export function* fetchViewData() {
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
