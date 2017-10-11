"use strict"
import {createStore} from 'redux';
// osts reducers

export function ostReducers(state={
    osts:[]
  }, action){
  switch (action.type){

    case "GET_OSTS":
      // return copy of the state and copy of the osts aray from the state
      // this connects to osts: state.osts.osts in ostsForm.

      return {...state, osts:[...action.payload]}
      break;

    case "POST_OST":
      return {...state, osts:[...state.osts, ...action.payload], msg: 'Saved! Click to continue', style:'success', validation:'success'}
      break;
    case "POST_OST_REJECTED":
      return {...state, msg:'Please, try again.', style:'danger', validation: 'error'}
      break;
    case "RESET_BUTTON":
      return {...state, msg:null, style:'primary', validation: null}
      break;
    case "DELETE_OST":
      //create a copy of the current array of osts
      const currentOstToDelete = [...state.osts]
      //determine at which index in array this ost should be deleted
      const indexToDelete = currentOstToDelete.findIndex(
        function(ost) {
          return ost._id == action.payload;
        }
      )
      return {osts: [...currentOstToDelete.slice(0, indexToDelete),
      ...currentOstToDelete.slice(indexToDelete + 1)]}
      break;

    case "UPDATE_OST":
    //create a copy of the current array of osts
    const currentOstToUpdate = [...state.osts]
    //determine at which index in array this ost should be updated
    const indexToUpdate = currentOstToUpdate.findIndex(
      function(ost) {
        return ost._id === action.payload._id;
      }
    )

    // Create a new ost object with the new values and with the same array index of the item we want to replace. To achieve this we will use ...spread but we could use concat method too.

    const newOstToUpdate = {
      ...currentOstToUpdate[indexToUpdate],
      title: action.payload.title
    }

    // this log shows what the newOstToUpdate looks like
    console.log("What is newOstToUpdate:", newOstToUpdate);

    return {osts: [...currentOstToUpdate.slice(0, indexToUpdate), newOstToUpdate,
    ...currentOstToUpdate.slice(indexToUpdate + 1)]}
    break;
  }
  return state
}
