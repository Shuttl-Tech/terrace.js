import { ACTIONS } from './actions';

export const REQUEST_STATE : {} = {
	REQUEST: 'REQUEST',
	SUCCESS: 'SUCCESS',
	FAILURE: 'FAILURE'
};

const defaultState = {
	data: {},
	status: REQUEST_STATE.REQUEST
};

const reducer = (state = defaultState, action) => {
	switch (action.type) {
		case ACTIONS.___resourceName____FETCH_REQUEST:
			return {...state, token: action.data, status: REQUEST_STATE.REQUEST };
		case ACTIONS.___resourceName____FETCH_SUCCESS:
			return {...state, token: action.data, status: REQUEST_STATE.SUCCESS };
		case ACTIONS.___resourceName____FETCH_FAILURE:
			return {...state, token: null, status: REQUEST_STATE.FAILURE };
	  default: return state;
	}
};

export default reducer;
