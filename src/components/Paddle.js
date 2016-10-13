import React from 'react'

export const PADDLE_WIDTH  =  8
export const PADDLE_HEIGHT = 60
export const PADDLE_STEP   =  5

const Paddle = ({ paddle }) => (
  <rect x={ paddle.get('x') } y={ paddle.get('y') } fill="black"
        width={ PADDLE_WIDTH } height={ PADDLE_HEIGHT } />
)

export default Paddle
