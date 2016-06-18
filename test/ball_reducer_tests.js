import assert from 'assert'
import { Map } from 'immutable'
import { hitPaddle, update } from '../src/actions'
import { HIT_PADDLE, NEW_BALL, UPDATE } from '../src/actions'
import { BALL_RADIUS } from '../src/components/Ball'
import { PADDLE_WIDTH, PADDLE_HEIGHT } from '../src/components/Paddle'
import { SVG_WIDTH, SVG_HEIGHT } from '../src/containers/App'
import reducer from '../src/reducers'

describe('ball reducer', () => {
  const initialState = reducer({}, 'INIT')

  describe(HIT_PADDLE, () => {
    const paddle  = initialState.paddles.get('right')
    const ball    = initialState.ball
          .set('x', paddle.get('x') + BALL_RADIUS + PADDLE_WIDTH  / 2)
          .set('y', paddle.get('y') + BALL_RADIUS + PADDLE_HEIGHT / 2)
    const initial = Object.assign({}, initialState, { ball })
    const updated = reducer(initial, hitPaddle(paddle))

    it('sets x so that the ball and paddle do not overlap', () => {
      assert.strictEqual(updated.paddles.get('right').get('x'),
                         updated.ball.get('x') + BALL_RADIUS)
    })

    it('inverts vx', () => {
      assert.strictEqual(updated.ball.get('vx'), -initial.ball.get('vx'))
    })

    it('does not affect y', () => {
      assert.strictEqual(updated.ball.get('y'), initial.ball.get('y'))
    })

    it('does not affect vy', () => {
      assert.strictEqual(updated.ball.get('vy'), initial.ball.get('vy'))
    })

    it('throws an Error if there was no collision', () => {
      const paddle = initialState.paddle
      assert.throws(() => reduce(initialState, hitPaddle(paddle)), Error)
    })
  })

  describe(NEW_BALL, () => {
    it('returns a ball in the centre of the screen', () => {
      assert.strictEqual(initialState.ball.get('x'), SVG_WIDTH  / 2)
      assert.strictEqual(initialState.ball.get('y'), SVG_HEIGHT / 2)
    })
  })

  describe(UPDATE, () => {
    it('increases x by vx', () => {
      const vx   = initialState.ball.get('vx')
      const x    = initialState.ball.get('x') + vx
      const ball = reducer(initialState, update()).ball

      assert(ball.equals(Map({
        x, vx, y: ball.get('y'), vy: ball.get('vy')
      })))
    })

    it('increases y by vy', () => {
      const vy   = initialState.ball.get('vy')
      const y    = initialState.ball.get('y') + vy
      const ball = reducer(initialState, update()).ball

      assert(ball.equals(Map({
        x: ball.get('x'), vx: ball.get('vx'), y, vy
      })))
    })

    it('does not change vx', () => {
      const vx = initialState.ball.get('vx')
      assert.strictEqual(reducer(initialState, update()).ball.get('vx'), vx)
    })

    it('does not change vy', () => {
      const vy = initialState.ball.get('vy')
      assert.strictEqual(reducer(initialState, update()).ball.get('vy'), vy)
    })

    it('allows x to be BALL_RADIUS at minimum', () => {
      const ball    = initialState.ball.set('x', 0).set('vx', -1)
      const initial = Object.assign({}, initialState, { ball })
      const updated = reducer(initial, update()).ball
      assert(updated.get('x') >= BALL_RADIUS)
    })

    it('allows y to be BALL_RADIUS at minimum', () => {
      const ball    = initialState.ball.set('y', 0).set('vy', -1)
      const initial = Object.assign({}, initialState, { ball })
      const updated = reducer(initial, update()).ball
      assert.strictEqual(updated.get('y'), BALL_RADIUS)
    })

    it('allows x to be SVG_WIDTH - BALL_RADIUS at maximum', () => {
      const ball    = initialState.ball.set('x', SVG_WIDTH)
      const initial = Object.assign({}, initialState, { ball })
      const updated = reducer(initial, update()).ball
      assert.strictEqual(updated.get('x'), SVG_WIDTH - BALL_RADIUS)
    })

    it('allows y to be SVG_HEIGHT - BALL_RADIUS at maximum', () => {
      const ball    = initialState.ball.set('y', SVG_HEIGHT)
      const initial = Object.assign({}, initialState, { ball })
      const updated = reducer(initial, update()).ball
      assert.strictEqual(updated.get('y'), SVG_HEIGHT - BALL_RADIUS)
    })
  })
})
