"use strict"
import {createStore} from 'redux';
// CART REDUCERS

export function contactReducers(state = { messages: [] }, action) {
    switch (action.type) {
      case "ADD_CONTACT_MESSAGE":
        return {...state, messages:[...state.messages, ...action.payload], msg: 'Message Sent!', style:'success', validation:'success'}
      break;

      case "INITIALIZE_CONTACT":
        return {...state, messages:[...state.messages], msg: null, style:null, validation:null}
      break;
    }
    return state;
}
