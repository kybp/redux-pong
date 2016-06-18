import _ from 'lodash'
import { Map } from 'immutable'
import { PADDLE_UP, PADDLE_DOWN } from '../actions'
import { BALL_RADIUS } from '../components/Ball'
import { PADDLE_HEIGHT, PADDLE_STEP } from '../components/Paddle'
import { SVG_WIDTH, SVG_HEIGHT } from '../containers/App'

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

export default paddles
