import React from 'react'

export const PADDLE_WIDTH  = 20
export const PADDLE_HEIGHT = 100
export const PADDLE_STEP   = 10

const Paddle = ({ paddle }) => (
  <rect x={ paddle.get('x') } y={ paddle.get('y') } fill="black"
        width={ PADDLE_WIDTH } height={ PADDLE_HEIGHT } />
)

export default Paddle
