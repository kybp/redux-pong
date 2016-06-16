export const ADD_BLOCK   = 'ADD_BLOCK'
export const BREAK_BLOCK = 'BREAK_BLOCK'
export const PADDLE_DOWN = 'PADDLE_DOWN'
export const PADDLE_UP   = 'PADDLE_UP'
export const NEW_BALL    = 'NEW_BALL'
export const UPDATE      = 'UPDATE'
export const WIN_POINTS  = 'WIN_POINTS'

export function addBlock(x, y) {
  return {
    type: ADD_BLOCK,
    x, y
  }
}

export function breakBlock(index) {
  return {
    type: BREAK_BLOCK,
    index
  }
}

export function movePaddleDown(side) {
  return {
    type: PADDLE_DOWN,
    side
  }
}

export function movePaddleUp(side) {
  return {
    type: PADDLE_UP,
    side
  }
}

export function newBall() {
  return {
    type: NEW_BALL
  }
}

export function update() {
  return {
    type: UPDATE
  }
}

export function winPoints(amount) {
  return {
    type: WIN_POINTS,
    amount
  }
}
