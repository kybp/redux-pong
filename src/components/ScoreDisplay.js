import React from 'react'
import { Table } from 'react-bootstrap'
import { connect } from 'react-redux'

const ScoreDisplay = ({ leftScore, rightScore }) => (
  <Table style={{ fontSize: 50 }}>
    <tbody>
      <tr>
        <td>Left</td>
        <td style={{ float: 'right', width: '100%' }}>
          <span style={{ 'float': 'right' }}>{ leftScore }</span>
        </td>
      </tr>
      <tr>
        <td>Right</td>
        <td style={{ float: 'right', width: '100%' }}>
          <span style={{ 'float': 'right' }}>{ rightScore }</span>
        </td>
      </tr>
    </tbody>
  </Table>
)

function mapStateToProps({ scores }) {
  return {
    leftScore:  scores.get('left'),
    rightScore: scores.get('right')
  }
}

export default connect(mapStateToProps)(ScoreDisplay)
