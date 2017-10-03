"use strict"

// ADD to cart
export function addToCart(book) {
    return {
        type: "ADD_TO_CART",
        payload: book
    }
};

// UPDATE cart
export function updateCart(_id, unit, cart) {
  //create a copy of the current array of books
  const currentBookToUpdate = cart
  //determine at which index in array this book should be updated
  const indexToUpdate = currentBookToUpdate.findIndex(
    function(book) {
      return book._id === _id;
    }
  )

  const newBookToUpdate = {
    ...currentBookToUpdate[indexToUpdate],
    quantity: currentBookToUpdate[indexToUpdate].quantity + unit
  }

  let cartUpdate = [...currentBookToUpdate.slice(0, indexToUpdate), newBookToUpdate,
  ...currentBookToUpdate.slice(indexToUpdate + 1)]
    return {
        type: "UPDATE_CART",
        payload: cartUpdate
    }
};

// DELETE FROM cart
export function deleteCartItem(cart) {
    return {
        type: "DELETE_CART_ITEM",
        payload: cart
    }
}
