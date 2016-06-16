import React from 'react'
import { connect } from 'react-redux'

const ScoreDisplay = ({ leftScore, rightScore }) => (
  <g>
    <text x="20" y="70" fontSize="80" fill="white">
      { 'Left: ' + leftScore }
    </text>
    <text x="20" y="140" fontSize="80" fill="white">
      { 'Right: ' + rightScore }
    </text>
  </g>
)

function mapStateToProps({ scores }) {
  return {
    leftScore:  scores.get('left'),
    rightScore: scores.get('right')
  }
}

export default connect(mapStateToProps)(ScoreDisplay)
