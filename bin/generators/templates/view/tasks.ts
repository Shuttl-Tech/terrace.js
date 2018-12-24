import { put as putAction } from 'redux-saga/effects';

import { get } from 'utils/http';
import API from 'apis';
import {
	___resourceName____FETCH_SUCCESS, ___resourceName____FETCH_FAILURE
} from './___lowerCaseResourceName___.actions';

export function* fetchViewData() {
	try {
		let data = yield get(API.DUMMY);
		return yield putAction(___resourceName____FETCH_SUCCESS({ data }));
	}
	catch (e) {
		yield putAction(___resourceName____FETCH_FAILURE());

		switch (e.message) {
			default: throw e;
		}
	}
}
