export const NEW_BALL    = 'NEW_BALL'
export const PADDLE_DOWN = 'PADDLE_DOWN'
export const PADDLE_UP   = 'PADDLE_UP'
export const UPDATE      = 'UPDATE'
export const WIN_POINTS  = 'WIN_POINTS'

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

export function winPoints(side, amount = 1) {
  return {
    type: WIN_POINTS,
    side, amount
  }
}
