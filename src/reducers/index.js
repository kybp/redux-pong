import { Map } from 'immutable'
import { combineReducers } from 'redux'
import { TOGGLE_PAUSE, WIN_POINTS } from '../actions'
import ball from './ball'
import paddles from './paddles'

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

function paused(state = false, action) {
  switch (action.type) {
  case TOGGLE_PAUSE:
    return ! state
  default:
    return state
  }
}

export default combineReducers({
  ball, scores, paddles, paused
})
