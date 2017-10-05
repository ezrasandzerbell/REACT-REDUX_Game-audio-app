"use strict"

// React
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';

// React-Router
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

import {applyMiddleware, createStore} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

// Import combinedReducers

import reducers from './reducers/index'

// import actions

import {addToCart} from './actions/cartActions'
import {postBooks, deleteBooks, updateBooks} from './actions/booksActions'
import routes from './routes'


//STEP 1 create the store
const middleware = applyMiddleware(thunk, logger)
// We Will pass initial state from server store
const initialState = window.INITIAL_STATE
const store = createStore(reducers, initialState, middleware);

const Routes = (
  <Provider store={store}>
    {routes}
  </Provider>
)


render(
  Routes, document.getElementById('app')
);
