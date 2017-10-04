"use strict"

import React from 'react';
import {MenuItem, InputGroup, DropdownButton, Image, Col, Row, Well, Panel, FormControl, FormGroup, ControlLabel, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {postBooks, deleteBooks, getBooks} from '../../actions/booksActions';
import {findDOMNode} from 'react-dom';
import axios from 'axios';

class BooksForm extends React.Component {

  constructor() {
    super();
    this.state = {
      images: [{}],
      img: ''
    }
  }

  componentDidMount() {

    this.props.getBooks();

    axios.get('/api/images')
      .then(function(response){
        this.setState({images:response.data});
      }.bind(this))
      .catch(function(err){
        this.setState({images:'error loading image files from the server', img: ''})
      })
      .bind(this)
  }

  handleSubmit(){
    const book=[{
      title: findDOMNode(this.refs.title).value,
      description: findDOMNode(this.refs.description).value,
      price: findDOMNode(this.refs.price).value,
      images: findDOMNode(this.refs.image).value
    }]
    this.props.postBooks(book)
  }

  onDelete(){
    let bookId = findDOMNode(this.refs.delete).value;

    this.props.deleteBooks(bookId)
  }

  handleSelect(img){
    this.setState({
      img: '/images/' + img
    })
  }

  render() {

    const booksList = this.props.books.map(function(booksArr){
      return (
        <option key={booksArr._id}> {booksArr._id}</option>
      )
    })

    const imgList = this.state.images.map(function(imgArr, i){
      return (
        <MenuItem key={i} eventKey={imgArr.name}
          onClick={this.handleSelect.bind(this, imgArr.name)}>{imgArr.name}</MenuItem>
      )
    }, this)

    return(
      <Well>
        <Row>
          <Col>
            <Panel>
              <InputGroup>
                <FormControl type="text" ref="image" value={this.state.img}/>
                <DropdownButton
                  componentClass={InputGroup.Button}
                  id="input-dropdown-addon"
                  title="Select an Image"
                  bsStyle="primary"
                >
                {imgList}
                </DropdownButton>
              </InputGroup>
              <Image src={this.state.img} responsive />
            </Panel>
          </Col>
          <Col>
            <Panel>
              <FormGroup controlId="title">
                <ControlLabel>Title</ControlLabel>
                <FormControl
                  type="text"
                  placeholder="Enter Title"
                  ref="title"
                />
              </FormGroup>
              <FormGroup controlId="description">
                <ControlLabel>Description</ControlLabel>
                <FormControl
                  type="text"
                  placeholder="Enter Description"
                  ref="description"
                />
              </FormGroup>
              <FormGroup controlId="price">
                <ControlLabel>Price</ControlLabel>
                <FormControl
                  type="text"
                  placeholder="Enter Price"
                  ref="price"
                />
              </FormGroup>
              <Button onClick={this.handleSubmit.bind(this)} bsStyle='primary'>Save Book</Button>
            </Panel>
            <Panel style={{marginTop:'25px'}}>
            <FormGroup controlId="formControlsSelect">
              <ControlLabel>Select a book id to delete</ControlLabel>
              <FormControl ref="delete" componentClass="select" placeholder="select">
                <option value="select">select</option>
                {booksList}
              </FormControl>
            </FormGroup>
            <Button onClick={this.onDelete.bind(this)} bsStyle="danger">Delete Book</Button>
            </Panel>
          </Col>
        </Row>
      </Well>
    )
  }
}

function mapStateToProps(state){
  return {
    books: state.books.books
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    postBooks,
    deleteBooks,
    getBooks
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(BooksForm);
