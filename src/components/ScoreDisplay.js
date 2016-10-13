import React from 'react'
import { connect } from 'react-redux'

const ScoreDisplay = ({ leftScore, rightScore }) => (
  <div className="h2 text-muted" style={{
         display: 'flex',
         justifyContent: 'space-between',
         alignItems:     'center'
       }}>
    <span>{ leftScore }</span>
    <span>Redux Pong</span>
    <span>{ rightScore }</span>
  </div>
)

function mapStateToProps({ scores }) {
  return {
    leftScore:  scores.get('left'),
    rightScore: scores.get('right')
  }
}

export default connect(mapStateToProps)(ScoreDisplay)
