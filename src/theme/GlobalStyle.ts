import { createGlobalStyle } from 'styled-components'
import 'normalize.css'
import { color } from './GlobalColor'

export const GlobalStyle = createGlobalStyle`
*,
*:before,
*:after {
  box-sizing: border-box;
}

html {
  height: 100%;
}

body {
  height: 100%;
}

#app {
  width: 100%;
  height: 100%;
  margin: 0;
}

.appWrap {
  display: flex;
  height: 100%;
}

.pomodoro {
  width: 50%;
  background-color: ${color.primary};
}

.timeTrack {
  width: 50%;
}
`
