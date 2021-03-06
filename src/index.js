import React from 'react'
import { render } from 'react-dom'
import App from './App'
import './index.less'

render(<App />, document.querySelector('#app'))

if (module && module.hot) {
  module.hot.accept()
}
