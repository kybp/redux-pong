import { Map } from 'immutable'
import { HIT_PADDLE, NEW_BALL, UPDATE } from '../actions'
import { BALL_RADIUS } from '../components/Ball'
import { PADDLE_WIDTH } from '../components/Paddle'
import { SVG_WIDTH, SVG_HEIGHT } from '../containers/App'
import { collides } from '../containers/PaddleContainer'

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
  if (collides(ball, paddle.left || paddle.right)) {
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

export default ball
