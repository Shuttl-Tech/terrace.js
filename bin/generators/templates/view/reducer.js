import { ACTIONS } from './___lowerCaseResourceName___-actions';
import { REQUEST_STATE } from 'globals/constants';

export const defaultState = {
	data: {},
	status: REQUEST_STATE.REQUEST
};

const reducer = (state = defaultState, action) => {
	switch (action.type) {
		case ACTIONS.___resourceName____FETCH_REQUEST:
			return {...state, status: REQUEST_STATE.REQUEST };
		case ACTIONS.___resourceName____FETCH_SUCCESS:
			return {...state, data: action.data, status: REQUEST_STATE.SUCCESS };
		case ACTIONS.___resourceName____FETCH_FAILURE:
			return {...state, data: {}, status: REQUEST_STATE.FAILURE };
	  default: return state;
	}
};

export default reducer;
