"use strict"
import {combineReducers} from 'redux';

// here import REDUCERS to be combined

import {ostReducers} from './ostReducers'
import {cartReducers} from './cartReducers'
import {contactReducers} from './contactReducers'

// here combined the reducers

export default combineReducers({
  osts: ostReducers,
  cart: cartReducers,
  messages: contactReducers
})
