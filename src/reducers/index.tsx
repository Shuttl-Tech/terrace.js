import { combineReducers } from 'redux';

import session, { DefaultState as SessionState } from 'views/Home/session.reducer';

export interface ReduxState {
	session: SessionState
}

export default combineReducers<ReduxState>({
	session
});
