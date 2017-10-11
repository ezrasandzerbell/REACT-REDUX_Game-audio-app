"use strict"
import React from 'react';
import { Image, Row, Col, Well, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addToCart, updateCart } from '../../actions/cartActions';

class OstItem extends React.Component {

    handleCart() {
        const ost = [...this.props.cart, {
            _id: this.props._id,
            gameTitle: this.props.gameTitle,
            composer: this.props.composer,
            publisher: this.props.publishers,
            releaseDate: this.props.releaseDate,
            description: this.props.description,
            trackList: this.props.trackList,
            images: this.props.images,
            url: this.props.url,
            quantity:1

        }];
        // CHECK If cart is empty
        if(this.props.cart.length > 0){
          // cart is not empty
          let _id = this.props._id;

          let cartIndex = this.props.cart.findIndex(function(cart){
            return cart._id === _id;
          })
          // If returns -1 then there are no items with same id
          if (cartIndex === -1){
            this.props.addToCart(ost);
          } else {
            // Need to update quantity
            this.props.updateCart(_id, 1, this.props.cart);
          }

        } else {
          // cart is empty
          this.props.addToCart(ost);
        }

    }

    constructor(){
      super();
      this.state = {
        isClicked:false
      }
    }
    onReadMore(){
      this.setState({isClicked:true})
    }

    render() {
        return (
            <Well>
                <Row>
                  <Image src={this.props.images} responsive/>
                </Row>
                  <Row className="ostItemText">

                        <h5 className="center-text">{this.props.gameTitle}</h5>
                        <p>Composer: <span className="pull-right">{this.props.composer}</span></p>
                        <p>Released: <span className="pull-right">{this.props.releaseDate}</span></p>
                        <p>Published by: <span className="pull-right">{this.props.publisher}</span></p>


                        <Button onClick={this.handleCart.bind(this)}  className="center-button">Buy now!</Button>
                </Row>
            </Well>
        )
    }
}

function mapStateToProps(state) {
    return {
        cart: state.cart.cart
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        addToCart: addToCart,
        updateCart: updateCart
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(OstItem);
