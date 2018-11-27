import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider as ReduxProvider } from 'react-redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import createSagaMiddleware from 'redux-saga';
import registerServiceWorker from 'registerServiceWorker';
// template-begin with-i18n keep
import { I18nextProvider } from 'react-i18next';
// template-end with-i18n

// template-begin with-i18n keep
import i18n from 'i18n';
// template-end with-i18n
import rootReducer from 'reducers';
import sagas from 'sagas';
import './index.scss';
import App from 'App';

const isNotProd = process.env.NODE_ENV !== 'production';

// Middlewares
export const saga = createSagaMiddleware();

let middlewares = [saga];

// Conditional Middlewares
middlewares = isNotProd ? [reduxImmutableStateInvariant(), ...middlewares] : middlewares;


export const store = createStore(
	rootReducer,
	composeWithDevTools(
    applyMiddleware(...middlewares)
  )
);

sagas.map(saga.run);

// template-begin with-i18n keep
ReactDOM.render(
	<I18nextProvider i18n={i18n}>
		<ReduxProvider store={store}>
			<App />
		</ReduxProvider>
	</I18nextProvider>
	, document.getElementById('root'));
// template-end with-i18n
// template-begin with-i18n remove
ReactDOM.render(
	<ReduxProvider store={store}>
		<App />
	</ReduxProvider>
	, document.getElementById('root'));
// template-end with-i18n
registerServiceWorker();
