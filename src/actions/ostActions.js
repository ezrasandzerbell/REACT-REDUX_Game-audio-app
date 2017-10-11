"use strict"
import axios from 'axios';

// Get osts
export function getOsts() {
  return function(dispatch){
      axios.get("/api/osts")
        .then(function(response){
          dispatch({type:"GET_OSTS", payload:response.data})
        })
        .catch(function(err){
          dispatch({type:"GET_OSTS_REJECTED", payload:err})
        })
    }
  }

// Post OST

export function postOst(ost) {
  return function(dispatch){
    axios.post("/api/osts", ost)
      .then(function(response){
        dispatch({type:"POST_OST", payload:response.data})
      })
      .catch(function(err){
        dispatch({type:"POST_OST_REJECTED", payload:"there was an error while posting a new ost"})
      })
  }
}

// DELETE OST

export function deleteOst(id){
  return function(dispatch){
    axios.delete("/api/osts/" + id)
      .then(function(response){
        dispatch({type:"DELETE_OST", payload:id})
      .catch(function(err){
        dispatch({type:"DELETE_OST_REJECTED", payload:err})
      })
      })
  }
}

// GET OST

export function getOst(id){
  return function(dispatch){
    axios.get("/api/osts/" + id)
      .then(function(response){
        dispatch({type:"GET_OST", payload:id})
      .catch(function(err){
        dispatch({type:"GET_OST_REJECTED", payload:err})
      })
      })
  }
}

// Update osts

export function updateOst(ost){
  return {
    type:"UPDATE_OST",
    payload: ost
  }
}

// reset ost form

export function resetButton(){
  return {
    type:"RESET_BUTTON"
  }
}
