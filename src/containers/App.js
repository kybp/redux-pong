import React, { Component } from 'react'
import { connect } from 'react-redux'
import { togglePause, update, winPoints } from '../actions'
import Ball, { BALL_RADIUS } from '../components/Ball'
import PaddleContainer from './PaddleContainer'
import ScoreDisplay from '../components/ScoreDisplay'

export const SVG_HEIGHT = 600
export const SVG_WIDTH  = 800

class App extends Component {
  componentDidMount() {
    this.interval = setInterval(() => {
      if (! this.props.paused) this.props.dispatch(update())
    }, 1000 / 30)
    document.addEventListener('keydown', event => this.handleInput(event))
  }

  handleInput(event) {
    if (event.which === 80) { // p
      this.props.dispatch(togglePause())
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval)
    document.removeEventListener('keydown', this.handleInput)
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

function mapStateToProps({ ball, score, paused }) {
  return {
    ballX: ball.get('x'),
    ballY: ball.get('y'),
    score, paused
  }
}

export default connect(mapStateToProps)(App)
