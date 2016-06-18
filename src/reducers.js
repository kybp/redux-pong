import _ from 'lodash'
import { Map } from 'immutable'
import { combineReducers } from 'redux'
import { HIT_PADDLE, NEW_BALL } from './actions'
import { PADDLE_DOWN, PADDLE_UP, UPDATE, WIN_POINTS } from './actions'
import { SVG_WIDTH, SVG_HEIGHT } from './containers/App'
import { BALL_RADIUS } from './components/Ball'
import { PADDLE_WIDTH, PADDLE_HEIGHT, PADDLE_STEP } from './components/Paddle'

const initialBall = Map({
  x: SVG_WIDTH  / 2,
  y: SVG_HEIGHT / 2,
  vx: 5,
  vy: -2
})

function updateAxisPosition(ball, axis, vAxis, maximum) {
  let newPosition = ball.get(axis) + ball.get(vAxis)
  let newVelocity = ball.get(vAxis)

  if (newPosition - BALL_RADIUS <= 0) {
    newPosition = BALL_RADIUS
    newVelocity *= -1
  } else if (newPosition + BALL_RADIUS >= maximum) {
    newPosition = maximum - BALL_RADIUS
    newVelocity *= -1
  }

  return { newPosition, newVelocity }
}

function updateXPosition(ball) {
  return updateAxisPosition(ball, 'x', 'vx', SVG_WIDTH)
}

function updateYPosition(ball) {
  return updateAxisPosition(ball, 'y', 'vy', SVG_HEIGHT)
}

function updateBall(ball) {
  const { newPosition: x, newVelocity: vx } = updateXPosition(ball)
  const { newPosition: y, newVelocity: vy } = updateYPosition(ball)
  return Map({ x, y, vx, vy })
}

function overlaps(lowEdge1, lowEdge2, highEdge1, highEdge2) {
  // We're adding 1 here so that both ends of the range will be
  // exclusive, and as a result the comparison will work the same
  // regardless of whether object 1 or 2 is farther along the axis
  return _.inRange(lowEdge1, lowEdge2 + 1, highEdge2) ||
    _.inRange(highEdge1, lowEdge2 + 1, highEdge2)
}

export function collides(ballX, ballY, paddle) {
  return overlaps(ballX - BALL_RADIUS,
                  paddle.get('x'),
                  ballX + BALL_RADIUS,
                  paddle.get('x') + PADDLE_WIDTH) &&
         overlaps(ballY - BALL_RADIUS,
                  paddle.get('y'),
                  ballY + BALL_RADIUS,
                  paddle.get('y') + PADDLE_HEIGHT)
}

// adjustForHit returns an object with the keys newPosition and
// newVelocity representing the ball's x-axis state after colliding
// with a paddle. This does not check that there actually was a
// collision; that is left to the caller. The second argument should
// be a hash specifying one of left or right, indicating whether it
// was the left or right paddle that was hit.
function adjustForHit(ball, { left, right }) {
  const paddle  = left || right
  const paddleX = paddle.get('x')
  const dx = paddle === left ? PADDLE_WIDTH + BALL_RADIUS : -BALL_RADIUS
  return { newPosition: paddleX + dx, newVelocity: -ball.get('vx') }
}

function checkCollision(ball, paddle) {
  if (collides(ball.get('x'), ball.get('y'), paddle.left || paddle.right)) {
    return adjustForHit(ball, paddle)
  } else return ball
}

function ball(state = initialBall, action) {
  switch (action.type) {
  case HIT_PADDLE: {
    const { newPosition: x, newVelocity: vx } =
          checkCollision(state, action.paddle)
    return state.set('x', x).set('vx', vx)
  } break
  case NEW_BALL:
    return initialBall
  case UPDATE:
    return updateBall(state)
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

function scores(state = Map({ left: 0, right: 0 }), action) {
  switch (action.type) {
  case WIN_POINTS:
    if (action.side !== 'left' && action.side !== 'right') {
      throw new Error('Bad score side: ' + action.side)
    }
    return state.set(action.side, state.get(action.side) + action.amount)
  default:
    return state
  }
}

export default combineReducers({
  ball, scores, paddles
})
