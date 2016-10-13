import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './reducers'
import App from './containers/App'

const store = createStore(reducer)

render(
  <Provider store={ store }>
    <div style={{
      height:         '90vh',
      display:        'flex',
      flexDirection:  'column',
      alignItems:     'center',
      justifyContent: 'center'
    }}>
      <App />
    </div>
  </Provider>,
  document.getElementById('app')
)
