import React, { Component } from 'react'
import { connect } from 'react-redux'
import { winPoints, update } from '../actions'
import Ball, { BALL_RADIUS } from '../components/Ball'
import PaddleContainer from './PaddleContainer'
import ScoreDisplay from '../components/ScoreDisplay'

export const SVG_HEIGHT = 600
export const SVG_WIDTH  = 800

class App extends Component {
  componentDidMount() {
    this.interval = setInterval(() => {
      this.props.dispatch(update())
    }, 1000 / 30)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  componentWillReceiveProps({ ballX }) {
    if (ballX - BALL_RADIUS <= 0) {
      this.props.dispatch(winPoints('right'))
    } else if (ballX + BALL_RADIUS >= SVG_WIDTH) {
      this.props.dispatch(winPoints('left'))
    }
  }

  render() {
    return (
      <svg width={ SVG_WIDTH } height={ SVG_HEIGHT } style={{
           backgroundColor: 'black' }}>
        <ScoreDisplay />
        <PaddleContainer>
          <Ball x={ this.props.ballX } y={ this.props.ballY } />
        </PaddleContainer>
      </svg>
    );
  }
}

function mapStateToProps(state) {
  return {
    ballX: state.ball.get('x'),
    ballY: state.ball.get('y'),
    score: state.score
  }
}

export default connect(mapStateToProps)(App)
