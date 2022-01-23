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
  height: 100%;
  @media screen and (min-width: 960px) {
    display: flex;

  }
}

.pomodoro {
  height: 100%;
  background-color: ${color.primary};
  @media screen and (min-width: 960px) {
    width: 50%;
  }
}

.timeTrack {
  height: 100%;
  @media screen and (min-width: 960px) {
    width: 50%;
  }
}
`
