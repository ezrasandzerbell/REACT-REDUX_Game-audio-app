"use strict"

import React from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {findDOMNode} from 'react-dom';
import {sendContactMessage, initializeContact} from '../../actions/contactActions';

import {MenuItem, InputGroup, DropdownButton, Image, Col, Row, Well, Panel, FormControl, FormGroup, ControlLabel, Button} from 'react-bootstrap';


class Contact extends React.Component {

  componentDidMount() {
    this.props.initializeContact();
  }

  handleSubmit(){
    const currentMessage=[{
      name: findDOMNode(this.refs.name).value,
      title: findDOMNode(this.refs.title).value,
      message: findDOMNode(this.refs.message).value
    }]
    this.props.sendContactMessage(currentMessage)
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

function mapStateToProps(state){
  return {
    msg: state.messages.msg,
    style: state.messages.style,
    validation: state.messages.validation
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    sendContactMessage,
    initializeContact
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Contact);
