"use strict"
import axios from 'axios';

// ADD to cart

export function sendContactMessage(contactMessage) {
  return function(dispatch){
    axios.post("/api/messages", contactMessage)
      .then(function(response){
        dispatch({type:"ADD_CONTACT_MESSAGE", payload:response.data})
      })
      .catch(function(err){
        console.log("test");
        dispatch({type:"ADD_CONTACT_MESSAGE_REJECTED", msg: 'error in attempt to send message'})
      })
  }
};

// initialize Contact

export function initializeContact() {
  return {
    type:"INITIALIZE_CONTACT"
  }
}
