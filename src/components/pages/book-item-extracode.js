<p>{(this.props.description.length > 50 && this.state.isClicked === false)?(this.props.description.substring(0, 50)):(this.props.description)}
  <button className='link' onClick={this.onReadMore.bind(this)}>
    {(this.state.isClicked === false && this.props.description !== null && this.props.description.length > 50 )?('...read more'):('')}
  </button>
</p>
