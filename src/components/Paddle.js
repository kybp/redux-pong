import React from 'react'

const PADDLE_WIDTH  = 20
const PADDLE_HEIGHT = 100

export const PADDLE_STEP = 10

const Paddle = ({ paddle }) => (
  <rect x={ paddle.get('x') } y={ paddle.get('y') } fill="blue"
        width={ PADDLE_WIDTH } height={ PADDLE_HEIGHT } />
)

export default Paddle
