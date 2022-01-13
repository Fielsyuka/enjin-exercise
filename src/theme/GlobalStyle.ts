import { createGlobalStyle } from 'styled-components'
import 'normalize.css'

export const GlobalStyle = createGlobalStyle`
*,
*:before,
*:after {
  box-sizing: border-box;
}

#app {
  width: 90%;
  max-width: 750px;
  margin: 0 auto;
}

`
