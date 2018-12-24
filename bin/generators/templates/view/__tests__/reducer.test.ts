import { REQUEST_STATE } from 'globals/constants';
import reducer, { defaultState } from '../___lowerCaseResourceName___.reducer';
import {
	___resourceName____FETCH_REQUEST, ___resourceName____FETCH_SUCCESS, ___resourceName____FETCH_FAILURE
} from '../___lowerCaseResourceName___.actions';

const DUMMY_VALUE = { prop: "some-random-string" };

describe('___lowerCaseResourceName___ reducer', () => {
	it('should return the initial state', () => {
		expect(reducer(undefined, { type: '@@NOTHING' })).toEqual(defaultState);
	});

	it('should handle ___resourceName____FETCH_REQUEST', () => {
		expect(reducer(defaultState, ___resourceName____FETCH_REQUEST())).toEqual({...defaultState, status: REQUEST_STATE.REQUEST });
	});

	it('should handle ___resourceName____FETCH_SUCCESS', () => {
		expect(reducer(defaultState, ___resourceName____FETCH_SUCCESS({ data: DUMMY_VALUE }))).toEqual({...defaultState, data: DUMMY_VALUE, status: REQUEST_STATE.SUCCESS });
	});

	it('should handle ___resourceName____FETCH_FAILURE', () => {
		expect(reducer(defaultState, ___resourceName____FETCH_FAILURE())).toEqual({...defaultState, data: {}, status: REQUEST_STATE.FAILURE });
	});
});
