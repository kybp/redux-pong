import _ from 'lodash'
import { Map } from 'immutable'
import { combineReducers } from 'redux'
import { NEW_BALL, PADDLE_DOWN, PADDLE_UP, UPDATE, WIN_POINTS } from './actions'
import { SVG_WIDTH, SVG_HEIGHT } from './containers/App'
import { BALL_RADIUS } from './components/Ball'
import { PADDLE_HEIGHT, PADDLE_STEP } from './components/Paddle'

const initialBall = Map({
  x: SVG_WIDTH  / 2,
  y: SVG_HEIGHT / 2,
  vx: 5,
  vy: -2
})

function ball(state = initialBall, action) {
  switch (action.type) {
  case NEW_BALL:
    return initialBall
  case UPDATE:
    let newX  = state.get('x') + state.get('vx')
    let newVx = state.get('vx')
    if (newX - BALL_RADIUS < 0) {
      newX = BALL_RADIUS
      newVx *= -1
    } else if (newX + BALL_RADIUS >= SVG_WIDTH) {
      newX = SVG_WIDTH - BALL_RADIUS
      newVx *= -1
    }
    let newY = state.get('y') + state.get('vy')
    let newVy = state.get('vy')
    if (newY - BALL_RADIUS < 0) {
      newY = BALL_RADIUS
      newVy *= -1
    } else if (newY + BALL_RADIUS >= SVG_HEIGHT) {
      newY = SVG_HEIGHT - BALL_RADIUS
      newVy *= -1
    }
    return Map({ x: newX, y: newY, vx: newVx, vy: newVy })
  default:
    return state
  }
}

const initialPaddles = Map({
  left:  Map({ x:             BALL_RADIUS * 3, y: SVG_HEIGHT / 2 }),
  right: Map({ x: SVG_WIDTH - BALL_RADIUS * 3, y: SVG_HEIGHT / 2 })
})

function paddles(state = initialPaddles, action) {
  function movePaddle(paddle, amount) {
    const newY = _.clamp(paddle.get('y') + amount, 0,
                         SVG_HEIGHT - PADDLE_HEIGHT)
    return paddle.set('y', newY)
  }

  function getPaddle() {
    switch (action.side) {
    case 'left':
      return state.get('left')
    case 'right':
      return state.get('right')
    default:
      throw new Error('Bad paddle side: ' + action.side)
    }
  }

  switch (action.type) {
  case PADDLE_UP:
    return state.set(action.side, movePaddle(getPaddle(), -PADDLE_STEP))
  case PADDLE_DOWN:
    return state.set(action.side, movePaddle(getPaddle(),  PADDLE_STEP))
  default:
    return state
  }
}

function score(state = 0, action) {
  switch (action.type) {
  case WIN_POINTS:
    return state + action.amount
  default:
    return state
  }
}

export default combineReducers({
  ball, score, paddles
})
