import React from 'react'
import ReactDOM from 'react-dom'
import { Button } from './components/Button'

function App() {
  return (
    <>
      <h1>React Exercise </h1>
      <p>Hello</p>
      <Button>ボタン</Button>
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))
