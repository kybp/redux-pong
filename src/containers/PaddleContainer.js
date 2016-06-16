import React, { Component } from 'react'
import { connect } from 'react-redux'
import { movePaddleUp, movePaddleDown } from '../actions'
import Paddle from '../components/Paddle'

class PaddleContainer extends Component {
  componentDidMount() {
    document.addEventListener('keydown', event => {
      this.handleInput(event)
    })
  }

  handleInput(event) {
    switch (event.which) {
    case 87: // w
      return this.props.dispatch(movePaddleUp('left'))
    case 83: // s
      return this.props.dispatch(movePaddleDown('left'))
    case 79: // o
      return this.props.dispatch(movePaddleUp('right'))
    case 76: // l
      return this.props.dispatch(movePaddleDown('right'))
    }
  }

  render() {
    return (
      <g>
        <Paddle paddle={ this.props.leftPaddle  } />
        <Paddle paddle={ this.props.rightPaddle } />
      </g>
    )
  }
}

function mapStateToProps({ paddles }) {
  return {
    leftPaddle:  paddles.get('left'),
    rightPaddle: paddles.get('right')
  }
}

export default connect(mapStateToProps)(PaddleContainer)
