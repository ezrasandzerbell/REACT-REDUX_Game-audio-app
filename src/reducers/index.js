"use strict"
import {combineReducers} from 'redux';

// here import REDUCERS to be combined

import {booksReducers} from './booksReducers'
import {cartReducers} from './cartReducers'

// here combined the reducers

export default combineReducers({
  books: booksReducers,
  cart: cartReducers
})
