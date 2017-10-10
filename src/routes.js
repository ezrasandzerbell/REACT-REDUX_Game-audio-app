"use strict"

// React
import React from 'react';
import {render} from 'react-dom';

// React-Router
import {Router, Route, IndexRoute, browserHistory} from 'react-router';


import BooksList from './components/pages/booksList';
import Cart from './components/pages/cart';
import BooksForm from './components/pages/booksForm';
import About from './components/pages/about';
import Main from './main';
import Contact from './components/pages/contactForm';

const routes = (
    <Router history={browserHistory}>
      <Route path="/" component={Main}>
        <IndexRoute component={BooksList}/>
        <Route path="/admin" component={BooksForm} />
        <Route path="/cart" component={Cart} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
      </Route>
    </Router>
);

export default routes;
