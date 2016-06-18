import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { hitPaddle, movePaddleUp, movePaddleDown } from '../actions'
import { BALL_RADIUS } from '../components/Ball'
import Paddle, { PADDLE_WIDTH, PADDLE_HEIGHT } from '../components/Paddle'

function overlaps(lowEdge1, lowEdge2, highEdge1, highEdge2) {
  // We're adding 1 here so that both ends of the range will be
  // exclusive, and as a result the comparison will work the same
  // regardless of whether object 1 or 2 is farther along the axis
  return _.inRange(lowEdge1, lowEdge2 + 1, highEdge2) ||
    _.inRange(highEdge1, lowEdge2 + 1, highEdge2)
}

export function collides(ball, paddle) {
  return overlaps(ball.get('x')   - BALL_RADIUS,
                  paddle.get('x'),
                  ball.get('x')   + BALL_RADIUS,
                  paddle.get('x') + PADDLE_WIDTH) &&
         overlaps(ball.get('y')   - BALL_RADIUS,
                  paddle.get('y'),
                  ball.get('y')   + BALL_RADIUS,
                  paddle.get('y') + PADDLE_HEIGHT)
}

class PaddleContainer extends Component {
  componentDidMount() {
    document.addEventListener('keydown', event => {
      this.handleInput(event)
    })
  }

  handleInput(event) {
    if (this.props.paused) return

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
    if (collides(ball, leftPaddle)) {
      this.props.dispatch(hitPaddle(leftPaddle))
    } else if (collides(ball, rightPaddle)) {
      this.props.dispatch(hitPaddle(rightPaddle))
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

function mapStateToProps({ ball, paddles, paused }) {
  return {
    leftPaddle:  paddles.get('left'),
    rightPaddle: paddles.get('right'),
    ball, paused
  }
}

export default connect(mapStateToProps)(PaddleContainer)
