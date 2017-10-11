"use strict"

import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getOst} from '../../actions/ostActions';

class OstPage extends React.Component {

  render(){
    return (
      <div>
      <h1>Testing123</h1>
      <h1>Testing123</h1>
      <h1>Testing123</h1>
      <h1>Testing123</h1>
      </div>
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
    getOst:getOst
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(OstPage);
