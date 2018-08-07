import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import session from 'views/Home/session-reducer';

export default combineReducers({
	form,
	session
});
