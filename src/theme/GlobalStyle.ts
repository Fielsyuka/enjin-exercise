import { createGlobalStyle } from 'styled-components'
import 'normalize.css'
import { color } from './GlobalColor'

export const GlobalStyle = createGlobalStyle`

html {
  -webkit-text-size-adjust: 100%;
  box-sizing: border-box;
  height: 100%;
  overflow-y: scroll;
  scroll-behavior: smooth;
}

*,
*:before,
*:after {
  box-sizing: inherit;
}

body {
  text-rendering: optimizelegibility;
  font-feature-settings: "pkna";
  height: 100%;
  color: rgb(28, 28, 28);
  font: 1em / 1.5 "ヒラギノ角ゴ Pro W3", "Hiragino Kaku Gothic Pro", 游ゴシック, "Yu Gothic", 游ゴシック体, yugothic, "Meiryo UI", メイリオ, meiryo, sans-serif;
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
