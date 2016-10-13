import React, { Component } from 'react'
import { connect } from 'react-redux'
import { togglePause, update, winPoints } from '../actions'
import Ball, { BALL_RADIUS } from '../components/Ball'
import PaddleContainer from './PaddleContainer'
import ScoreDisplay from '../components/ScoreDisplay'
import { Well } from 'react-bootstrap'

export const SVG_HEIGHT = 300
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
      <div style={{ border: '1px solid black', display: 'inline-block' }}>
        <Well style={{ margin: 0 }}>
          <ScoreDisplay />
        </Well>
        <svg width={ SVG_WIDTH } height={ SVG_HEIGHT }>
          <PaddleContainer>
            <Ball x={ this.props.ballX } y={ this.props.ballY } />
          </PaddleContainer>
        </svg>
      </div>
    )
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
