import React from 'react'

export const BALL_RADIUS = 20

const Ball = ({ x, y }) => (
  <circle cx={ x } cy={ y } r={ BALL_RADIUS } fill="white" />
)

export default Ball
