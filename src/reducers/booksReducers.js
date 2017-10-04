"use strict"
import {createStore} from 'redux';
// books reducers

export function booksReducers(state={
    books:[]
  }, action){
  switch (action.type){

    case "GET_BOOKS":
      // return copy of the state and copy of the books aray from the state
      // this connects to books: state.books.books in booksForm.

      return {...state, books:[...action.payload]}
      break;

    case "POST_BOOK":
      return {...state, books:[...state.books, ...action.payload], msg: 'Saved! Click to continue', style:'success', validation:'success'}
      break;
    case "POST_BOOK_REJECTED":
      return {...state, msg:'Please, try again.', style:'danger', validation: 'error'}
      break;
    case "RESET_BUTTON":
      return {...state, msg:null, style:'primary', validation: null}
      break;
    case "DELETE_BOOK":
      //create a copy of the current array of books
      const currentBookToDelete = [...state.books]
      //determine at which index in array this book should be deleted
      const indexToDelete = currentBookToDelete.findIndex(
        function(book) {
          return book._id == action.payload;
        }
      )
      return {books: [...currentBookToDelete.slice(0, indexToDelete),
      ...currentBookToDelete.slice(indexToDelete + 1)]}
      break;

    case "UPDATE_BOOK":
    //create a copy of the current array of books
    const currentBookToUpdate = [...state.books]
    //determine at which index in array this book should be updated
    const indexToUpdate = currentBookToUpdate.findIndex(
      function(book) {
        return book._id === action.payload._id;
      }
    )

    // Create a new book object with the new values and with the same array index of the item we want to replace. To achieve this we will use ...spread but we could use concat method too.

    const newBookToUpdate = {
      ...currentBookToUpdate[indexToUpdate],
      title: action.payload.title
    }

    // this log shows what the newBookToUpdate looks like
    console.log("What is newBookToUpdate:", newBookToUpdate);

    return {books: [...currentBookToUpdate.slice(0, indexToUpdate), newBookToUpdate,
    ...currentBookToUpdate.slice(indexToUpdate + 1)]}
    break;
  }
  return state
}
