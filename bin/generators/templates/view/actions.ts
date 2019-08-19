import { ReduxAction } from 'types/redux';

export const ACTIONS = {
  ___resourceName____FETCH_REQUEST: "___resourceName____FETCH_REQUEST",
  ___resourceName____FETCH_SUCCESS: "___resourceName____FETCH_SUCCESS",
  ___resourceName____FETCH_FAILURE: "___resourceName____FETCH_FAILURE"
};

export function ___resourceName____FETCH_REQUEST(payload: {} = {}) : ReduxAction {
  return { type: ACTIONS.___resourceName____FETCH_REQUEST, payload }
}

export function ___resourceName____FETCH_SUCCESS(payload: {} = {}) : ReduxAction {
  return { type: ACTIONS.___resourceName____FETCH_SUCCESS, payload }
}

export function ___resourceName____FETCH_FAILURE(payload: {} = {}) : ReduxAction {
  return { type: ACTIONS.___resourceName____FETCH_FAILURE, payload }
}
