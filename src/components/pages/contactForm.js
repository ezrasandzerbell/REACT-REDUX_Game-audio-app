"use strict"

import React from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

import sendContactMessage from '../../actions/contactActions';
import contactReducers from '../../reducers/contactReducers';

import {MenuItem, InputGroup, DropdownButton, Image, Col, Row, Well, Panel, FormControl, FormGroup, ControlLabel, Button} from 'react-bootstrap';


class Contact extends React.Component {

  handleSubmit(){
    const book=[{
      name: findDOMNode(this.refs.name).value,
      title: findDOMNode(this.refs.title).value,
      message: findDOMNode(this.refs.message).value
    }]
    this.props.postBooks(book)
  }

  resetForm(){
    // RESET THE Button
    findDOMNode(this.refs.name).value  = '';
    findDOMNode(this.refs.title).value  = '';
    findDOMNode(this.refs.message).value = '';
  }

  render() {
    return (
      <div>
        <Well className="well-config">
            <h1 className="center-text margin-bottom-sml">Contact Us!</h1>
            <Panel>
              <FormGroup controlId="name" validationState={this.props.validation}>

                <ControlLabel>Please Enter Your Name</ControlLabel>
                <FormControl
                  type="text"
                  placeholder="Full Name"
                  ref="name"
                />
                <FormControl.Feedback/>
              </FormGroup>
              <FormGroup controlId="title" validationState={this.props.validation}>
                <ControlLabel>Message Title</ControlLabel>
                <FormControl
                  type="text"
                  placeholder="Message Title"
                  ref="title"
                />
                <FormControl.Feedback/>
              </FormGroup>
              <FormGroup controlId="message" validationState={this.props.validation}>
                <ControlLabel>Message</ControlLabel>
                <FormControl
                  type="text"
                  componentClass="textarea"
                  placeholder="Enter Your Message"
                  ref="message"
                  style={{ height: 200 }}
                />
                <FormControl.Feedback/>
              </FormGroup>
              <Button
              onClick={(!this.props.msg)?(this.handleSubmit.bind(this)):(this.resetForm.bind(this))}
              bsStyle={(!this.props.style)?("primary"):(this.props.style)} className="center-button">
                {(!this.props.msg)?("Send Message"):(this.props.msg)}
              </Button>
            </Panel>
        </Well>
      </div>
    )
  }
}

export default Contact;
