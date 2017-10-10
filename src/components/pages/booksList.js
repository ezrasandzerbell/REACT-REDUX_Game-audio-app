"use strict"

import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getBooks} from '../../actions/booksActions';
import {Carousel, Grid, Col, Row, Button} from 'react-bootstrap';

import BookItem from './bookItem';
import BooksForm from './booksForm';
import Cart from './cart';

class BooksList extends React.Component{
  componentDidMount(){
    // dispatch an action
    this.props.getBooks();
  }
  render(){
    const booksList = this.props.books.map(function(booksArr){
      return (
        <Col xs={12} sm={6} md={4} key={booksArr._id}>
          <BookItem
              _id={booksArr._id}
              title={booksArr.title}
              description={booksArr.description}
              images={booksArr.images}
              price={booksArr.price}
          />
        </Col>
      )
    })
    return (
      <Grid>
        <Row>
        <Carousel>
          <Carousel.Item>
            <img width={900} height={300} alt="900x300" src="/images/books-carousel-1.jpg" className="image-dim"/>
            <Carousel.Caption>
              <h3>Rare Books</h3>
              <p>Connect with book dealers and get the best price on rare items.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img width={900} height={300} alt="900x300" src="/images/books-carousel-2.jpg" className="image-dim"/>
            <Carousel.Caption>
              <h3>Over 10,000 Titles</h3>
              <p>Use our system to browse a huge library of rare books.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
        </Row>
        <Row>
          <Cart />
        </Row>

        <Row style={{marginTop:'15px'}}>
          {booksList}
        </Row>


      </Grid>
    )
  }
}
function mapStateToProps(state){
  return {
    books: state.books.books
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    getBooks:getBooks
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(BooksList);
