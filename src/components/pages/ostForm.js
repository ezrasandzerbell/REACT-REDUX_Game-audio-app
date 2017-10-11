"use strict"

import React from 'react';
import {MenuItem, InputGroup, DropdownButton, Image, Col, Row, Well, Panel, FormControl, FormGroup, ControlLabel, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {postOst, deleteOst, getOsts, resetButton} from '../../actions/ostActions';
import {findDOMNode} from 'react-dom';
import axios from 'axios';

class OstForm extends React.Component {

  constructor() {
    super();
    this.state = {
      images: [{}],
      img: ''
    }
  }

  componentDidMount() {

    this.props.getOsts();

    axios.get('/api/images')
      .then(function(response){
        this.setState({images:response.data});
      }.bind(this))
      .catch(function(err){
        this.setState({images:'error loading image files from the server', img: ''})
      })
  }

  handleSubmit(){
    const ost=[{
      gameTitle: findDOMNode(this.refs.gameTitle).value,
      composer: findDOMNode(this.refs.composer).value,
      publisher: findDOMNode(this.refs.publisher).value,
      releaseDate: findDOMNode(this.refs.releaseDate).value,
      description: findDOMNode(this.refs.description).value,
      trackList: findDOMNode(this.refs.trackList).value,
      images: findDOMNode(this.refs.image).value,
      url: findDOMNode(this.refs.url).value
    }]
    this.props.postOst(ost)
  }

  onDelete(){
    let ostId = findDOMNode(this.refs.delete).value;

    this.props.deleteOst(ostId)
  }

  handleSelect(img){
    this.setState({
      img: '/images/' + img
    })
  }

  resetForm(){
    // RESET THE Button
    this.props.resetButton();
    findDOMNode(this.refs.gameTitle).value  = '';
    findDOMNode(this.refs.composer).value  = '';
    findDOMNode(this.refs.publisher).value = '';
    findDOMNode(this.refs.releaseDate).value  = '';
    findDOMNode(this.refs.description).value  = '';
    findDOMNode(this.refs.trackList).value = '';
    findDOMNode(this.refs.url).value = '';
    this.setState({img: ''});

  }

  render() {

    const ostList = this.props.osts.map(function(ostArr){
      return (
        <option key={ostArr._id}> {ostArr._id}</option>
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
          <Col xs={12} sm={6}>
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
          <Col xs={12} sm={6}>
            <Panel>
              <FormGroup controlId="gameTitle" validationState={this.props.validation}>
                <ControlLabel>Game Title</ControlLabel>
                <FormControl
                  type="text"
                  placeholder="Enter Game Title"
                  ref="gameTitle"
                />
                <FormControl.Feedback/>
              </FormGroup>
              <FormGroup controlId="composer" validationState={this.props.validation}>
                <ControlLabel>Composer</ControlLabel>
                <FormControl
                  type="text"
                  placeholder="Enter Composer"
                  ref="composer"
                />
                <FormControl.Feedback/>
              </FormGroup>
              <FormGroup controlId="publisher" validationState={this.props.validation}>
                <ControlLabel>Publisher</ControlLabel>
                <FormControl
                  type="text"
                  placeholder="Enter Publisher"
                  ref="publisher"
                />
                <FormControl.Feedback/>
              </FormGroup>
              <FormGroup controlId="releaseDate" validationState={this.props.validation}>
                <ControlLabel>Release Date</ControlLabel>
                <FormControl
                  type="text"
                  placeholder="Enter Release Date"
                  ref="releaseDate"
                />
                <FormControl.Feedback/>
              </FormGroup>
              <FormGroup controlId="description" validationState={this.props.validation}>
                <ControlLabel>Description</ControlLabel>
                <FormControl
                  type="text"
                  placeholder="Enter Description"
                  ref="description"
                />
                <FormControl.Feedback/>
              </FormGroup>
              <FormGroup controlId="trackList" validationState={this.props.validation}>
                <ControlLabel>Track List</ControlLabel>
                <FormControl
                  type="text"
                  componentClass="textarea"
                  placeholder="Enter Track List"
                  ref="trackList"
                />
                <FormControl.Feedback/>
              </FormGroup>
              <FormGroup controlId="url" validationState={this.props.validation}>
                <ControlLabel>Video Url</ControlLabel>
                <FormControl
                  type="text"
                  placeholder="Enter Video Url"
                  ref="url"
                />
                <FormControl.Feedback/>
              </FormGroup>
              <Button
              onClick={(!this.props.msg)?(this.handleSubmit.bind(this)):(this.resetForm.bind(this))}
              bsStyle={(!this.props.style)?("primary"):(this.props.style)}>
                {(!this.props.msg)?("Save Ost"):(this.props.msg)}
              </Button>
            </Panel>
            <Panel style={{marginTop:'25px'}}>
            <FormGroup controlId="formControlsSelect">
              <ControlLabel>Select a ost id to delete</ControlLabel>
              <FormControl ref="delete" componentClass="select" placeholder="select">
                <option value="select">select</option>
                {ostList}
              </FormControl>
            </FormGroup>
            <Button onClick={this.onDelete.bind(this)} bsStyle="danger">Delete Ost</Button>
            </Panel>
          </Col>
        </Row>
      </Well>
    )
  }
}

function mapStateToProps(state){
  return {
    osts: state.osts.osts,
    msg: state.osts.msg,
    style: state.osts.style,
    validation: state.osts.validation
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    postOst,
    deleteOst,
    getOsts,
    resetButton
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(OstForm);
