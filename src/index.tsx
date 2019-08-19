import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, Dispatch, AnyAction, Middleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import createSagaMiddleware from 'redux-saga';
import registerServiceWorker from 'registerServiceWorker';
import { BrowserRouter as Router } from 'react-router-dom';
import { StoreContext } from 'redux-react-hook';
import 'react-toastify/dist/ReactToastify.css';

import 'i18n'; // template-line with-i18n keep
import rootReducer from 'reducers';
import sagas from 'sagas';
import './index.scss';
import Home from 'views/Home';

const isNotProd = process.env.NODE_ENV !== 'production';

// Middlewares
export const saga = createSagaMiddleware();

let middlewares: Array<Middleware<{}, any, Dispatch<AnyAction>>> = [saga];

// Conditional Middlewares
middlewares = isNotProd ? [reduxImmutableStateInvariant(), ...middlewares] : middlewares;


export const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(...middlewares)
  )
);

sagas.map(saga.run);

ReactDOM.render(
  <StoreContext.Provider value={store}>
  	<Router>
  		<Home/>
  	</Router>
  </StoreContext.Provider>
  , document.getElementById('root'));
registerServiceWorker();
