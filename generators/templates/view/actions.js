/**
 * To create an action, you need to do 4 things.
 *
 * 1. Add a property to `ACTIONS` in uppercase with the action name.
 * 2. Set the value as exactly the same as property name.
 * 3. Copy an existing action method and replace the name with your action name.
 * 4. Set the type to `ACTIONS.YOUR_ACTION_NAME`.
 * 5. Add it to the relevant reducer.
 */

export const ACTIONS = {
	___resourceName____FETCH_REQUEST: "___resourceName____FETCH_REQUEST",
	___resourceName____FETCH_SUCCESS: "___resourceName____FETCH_SUCCESS",
	___resourceName____FETCH_FAILURE: "___resourceName____FETCH_FAILURE"
};

/*
 * Action Creator Template
 * _________________________________-
```
export function ___ACTION_NAME___(payload: {} = {}) : {} {
	return {
		type: ACTIONS.___ACTION_NAME___,
		...payload
	}
}
```
 */

export function ___resourceName____FETCH_REQUEST(payload: {} = {}) : {} {
	return {
		type: ACTIONS.___resourceName____FETCH_REQUEST,
		...payload
	}
}

export function ___resourceName____FETCH_SUCCESS(payload: {} = {}) : {} {
	return {
		type: ACTIONS.___resourceName____FETCH_SUCCESS,
		...payload
	}
}

export function ___resourceName____FETCH_FAILURE(payload: {} = {}) : {} {
	return {
		type: ACTIONS.___resourceName____FETCH_FAILURE,
		...payload
	}
}
