import { createGlobalStyle } from 'styled-components'
import 'normalize.css'
import { color } from './GlobalColor'

export const GlobalStyle = createGlobalStyle`

/* Base
----------------------------------------*/
html {
  -webkit-text-size-adjust: 100%;
  box-sizing: border-box;
  height: 100%;
  overflow-y: scroll;
  scroll-behavior: smooth;
  font-size: 100%;
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

/* Common
----------------------------------------*/
label {
  display: block;
  width: 100%;
  margin-bottom: 0.5em;
  padding: 0;
  color: ${color.grayText};
  font-size: 0.75em;
}

/* Layout
----------------------------------------*/
#app {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  width: 100%;
  height: 100%;
  margin: 0;
  @media screen and (min-width: 768px){
    flex-direction: row;
  }
}

/* Header */
.header {
  flex-shrink: 0;
  width: 100%;
  height: auto;
  background-color: ${color.navBg};
  z-index: 10;
  @media screen and (min-width: 768px){
    width: auto;
    height: 100%;
  }
}

/* Main */
.main {
  overflow: auto;
  position: relative;
  height: 100%;
  width: 100%;
}

.mainContent {
  overflow: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  margin: 0;
  padding: 40px 24px;
  background-color: ${color.grayBg};
  z-index: 1;
  @media screen and (min-width: 768px){
    padding: 40px;
  }
  &.is-active {
    z-index: 2;
  }
}

/* Pomodoro */
.pomodoro__timer {
  /* display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; */
  /* background-color: ${color.primary}; */
}

.pomodoro__setting {

}

/* TimeTrack */
.timeTrack {
}

/* Utility
----------------------------------------*/
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

.hidden-sp {
  display: none;
  @media screen and (min-width: 640px) {
    display: inline-block;
  }
}
`
