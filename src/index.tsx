import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { reducer } from './reducer'
import { GlobalStyle } from './theme/GlobalStyle'
import App from './App'

const store = createStore(reducer)
store.subscribe(() => {
  localStorage.setItem('cardList', JSON.stringify(store.getState().cardList))
  localStorage.setItem('tagList', JSON.stringify(store.getState().tagList))
})
console.log(store.getState().cardList)

ReactDOM.render(
  <Provider store={store}>
    <GlobalStyle />
    <App />
  </Provider>,
  document.getElementById('app'),
)
