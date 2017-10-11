"use strict"

import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getOsts} from '../../actions/ostActions';
import {Carousel, Grid, Col, Row, Button} from 'react-bootstrap';

import OstItem from './ostItem';
import OstForm from './ostForm';
import Cart from './cart';

class OstList extends React.Component{
  componentDidMount(){
    // dispatch an action
    this.props.getOsts();
  }
  render(){
    const ostsList = this.props.osts.map(function(ostArr){
      return (
        <Col xs={12} sm={6} md={4} key={ostArr._id}>
          <OstItem
              _id={ostArr._id}
              gameTitle={ostArr.gameTitle}
              composer={ostArr.composer}
              publisher={ostArr.publisher}
              releaseDate={ostArr.releaseDate}
              description={ostArr.description}
              trackList={ostArr.trackList}
              images={ostArr.images}
              url={ostArr.url}
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
              <h3>Videogame Soundtrack Library</h3>
              <p>Connect with OST lovers and discover new game music</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img width={900} height={300} alt="900x300" src="/images/books-carousel-2.jpg" className="image-dim"/>
            <Carousel.Caption>
              <h3>Over 10,000 Titles</h3>
              <p>Use our system to browse a huge library of rare osts</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
        </Row>
        <Row>
          <Cart />
        </Row>

        <Row style={{marginTop:'15px'}}>
          {ostsList}
        </Row>


      </Grid>
    )
  }
}
function mapStateToProps(state){
  return {
    osts: state.osts.osts
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    getOsts:getOsts
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(OstList);
