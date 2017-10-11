"use strict"
import axios from 'axios';

// GET CART

export function getCart(){
  return function(dispatch){
    axios.get('/api/cart')
      .then(function(response){
        dispatch({type:"GET_CART", payload:response.data})
      })
      .catch(function(err){
        dispatch({type:"GET_CART_REJECTED", msg: "error when getting cart from session"})
      })
  }
}

// ADD to cart
export function addToCart(cart) {
  return function(dispatch){
    axios.post("/api/cart", cart)
      .then(function(response){
        dispatch({type:"ADD_TO_CART", payload:response.data})
      })
      .catch(function(err){
        dispatch({type:"ADD_TO_CART_REJECTED", msg: 'error when adding to the cart'})
      })
  }
};

// UPDATE cart
export function updateCart(_id, unit, cart) {
  //create a copy of the current array of osts
  const currentOstToUpdate = cart
  //determine at which index in array this ost should be updated
  const indexToUpdate = currentOstToUpdate.findIndex(
    function(ost) {
      return ost._id === _id;
    }
  )

  const newOstToUpdate = {
    ...currentOstToUpdate[indexToUpdate],
    quantity: currentOstToUpdate[indexToUpdate].quantity + unit
  }

  let cartUpdate = [...currentOstToUpdate.slice(0, indexToUpdate), newOstToUpdate,
  ...currentOstToUpdate.slice(indexToUpdate + 1)]

  return function(dispatch){
    axios.post("/api/cart", cartUpdate)
      .then(function(response){
        dispatch({type:"UPDATE_CART", payload:response.data})
      })
      .catch(function(err){
        dispatch({type:"UPDATE_CART_REJECTED", msg: 'error when adding to the cart'})
      })
  }
};

// DELETE FROM cart
export function deleteCartItem(cart) {
    return function(dispatch) {
      axios.post("/api/cart", cart)
        .then(function(response){
          dispatch({type:"DELETE_FROM_CART", payload:response.data})
        })
        .catch(function(err){
          dispatch({type:"DELETE_FROM_CART_REJECTED", msg: 'error when deleting from the cart'})
        })
    }
}

// ADD to cart
