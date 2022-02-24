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

/* Common */
label {
  display: block;
  width: 100%;
  margin-bottom: 0.5em;
  padding: 0;
  color: ${color.grayText};
  font-size: 0.75em;
}

/* Layout */
#app {
  overflow: hidden;
  display: flex;
  width: 100%;
  height: 100%;
  margin: 0;
}

/* Header */
.header {
  width: 96px;
  height: 100%;
  background-color: ${color.navBg};
  z-index: 10;
}

/* Main */
.main {
  overflow: auto;
  position: relative;
  height: 100%;
  width: calc(100% - 96px);
}

.mainContent {
  padding: 40px;
}

/* Pomodoro */
.pomodoro {
  overflow: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  margin: 0;
}

.pomodoro__timer {
  overflow: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  margin: 0;
  padding: 24px;
  background-color: ${color.primary};
  &.is-active {
    z-index: 2;
  }
}

.pomodoro__setting {
  overflow: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 0;
  height: 100%;
  padding: 24px;
  background-color: ${color.grayBg};
  z-index: 1;
  &.is-active {
    z-index: 2;
  }
}

/* TimeTrack */
.timeTrack {
  overflow: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  background-color: #fff;
   z-index: 1;
   &.is-active {
    z-index: 2;
  }
}

/* Utility */
.flex {
  display: flex;
  align-items: center;
}

.algn-c {
  text-align: center;
}

.visuallyHidden {
	clip: rect(0 0 0 0);
	-webkit-clip-path: inset(50%);
	position: absolute;
	width: 1px;
	height: 1px;
	margin: -1px;
	padding: 0;
	overflow: hidden;
	border: 0;
	white-space: nowrap;
	clip-path: inset(50%);
}
`
