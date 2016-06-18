import React, { Component } from 'react'
import { connect } from 'react-redux'
import { hitPaddle, movePaddleUp, movePaddleDown } from '../actions'
import Paddle from '../components/Paddle'
import { collides } from '../reducers'

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

  componentWillReceiveProps({ ball, leftPaddle, rightPaddle }) {
    const x = ball.get('x')
    const y = ball.get('y')

    if (collides(x, y, leftPaddle)) {
      this.props.dispatch(hitPaddle(ball, leftPaddle))
    } else if (collides(x, y, rightPaddle)) {
      this.props.dispatch(hitPaddle(ball, rightPaddle))
    }
  }

  render() {
    return (
      <g>
        <Paddle paddle={ this.props.leftPaddle  } />
        { this.props.children }
        <Paddle paddle={ this.props.rightPaddle } />
      </g>
    )
  }
}

function mapStateToProps({ ball, paddles }) {
  return {
    leftPaddle:  paddles.get('left'),
    rightPaddle: paddles.get('right'),
    ball
  }
}

export default connect(mapStateToProps)(PaddleContainer)
