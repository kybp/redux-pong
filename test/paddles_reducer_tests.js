import assert from 'assert'
import { movePaddleDown, movePaddleUp } from '../src/actions'
import { PADDLE_DOWN, PADDLE_UP } from '../src/actions'
import { PADDLE_HEIGHT, PADDLE_STEP } from '../src/components/Paddle'
import { SVG_WIDTH, SVG_HEIGHT } from '../src/containers/App'
import reducer from '../src/reducers'

describe('paddle reducer', () => {
  const initialState = reducer({}, 'INIT')

  describe(PADDLE_UP, () => {
    it('moves the paddle up by PADDLE_STEP', () => {
      const y       = initialState.paddles.get('left').get('y')
      const updated = reducer(initialState, movePaddleUp('left'))
      assert.strictEqual(updated.paddles.get('left').get('y'), y - PADDLE_STEP)
    })

    it('does not move the paddle into negative y', () => {
      const paddle  = initialState.paddles.get('left').set('y', 0)
      const paddles = initialState.paddles.set('left', paddle)
      const initial = Object.assign({}, initialState, { paddles })
      const updated = reducer(initial, movePaddleUp('left'))
      assert.strictEqual(updated.paddles.get('left').get('y'), 0)
    })
  })

  describe(PADDLE_DOWN, () => {
    it('moves the paddle down by PADDLE_STEP', () => {
      const y       = initialState.paddles.get('left').get('y')
      const updated = reducer(initialState, movePaddleDown('left'))
      assert.strictEqual(updated.paddles.get('left').get('y'), y + PADDLE_STEP)
    })

    it('does not move the paddles past the end of the SVG', () => {
      const y       = SVG_HEIGHT - PADDLE_HEIGHT
      const paddle  = initialState.paddles.get('left').set('y', y)
      const paddles = initialState.paddles.set('left', paddle)
      const initial = Object.assign({}, initialState, { paddles })
      const updated = reducer(initial, movePaddleDown('left'))
      assert.strictEqual(updated.paddles.get('left').get('y'), y)
    })
  })
})
