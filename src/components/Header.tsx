import React, { memo, useCallback } from 'react'
import styled from 'styled-components'
import { color } from '../theme/GlobalColor'
import { TrackingIcon as _TrackingIcon } from './Icon'
import { SettingIcon as _SettingIcon } from './Icon'
import { PomodoroIcon as _PomodoroIcon } from './Icon'

const Header = () => {
  // ナビゲーションクリックで画面切り替え
  const handleSwitchScreen = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault()
      const currentNavItem = e.currentTarget as HTMLElement

      const navItems = document.querySelectorAll('.js-navSwitchTrigger')
      navItems.forEach(item => {
        item.classList.remove('is-active')
      })
      currentNavItem.classList.add('is-active')

      const screens = document.querySelectorAll('.js-switchScreen')
      screens.forEach(screen => {
        screen.classList.remove('is-active')
      })
      const targetId = currentNavItem.getAttribute('href')
      if (targetId) {
        const target = document.querySelector(targetId)
        target?.classList.add('is-active')
      }
    },
    [],
  )
  return (
    <>
      <header id="header" className="header">
        <SNav>
          <ul>
            <li>
              <a
                href="#timeTrack"
                onClick={handleSwitchScreen}
                className="js-navSwitchTrigger is-active"
              >
                <TrackingIcon />
                <span className="spHidden">Time-tracking</span>
              </a>
            </li>
            <li>
              <a
                href="#pomodoroTimer"
                onClick={handleSwitchScreen}
                className="js-navSwitchTrigger"
              >
                <PomodoroIcon />
                <span className="spHidden">Pomodoro</span>
              </a>
            </li>
            <li>
              <a
                href="#pomodoroSetting"
                onClick={handleSwitchScreen}
                className="js-navSwitchTrigger"
              >
                <SettingIcon />
                <span className="spHidden">Setting</span>
              </a>
            </li>
          </ul>
        </SNav>
      </header>
    </>
  )
}

const SNav = styled.nav`
  width: 100%;
  height: 100%;
  background-color: ${color.navBg};
  color: #fff;

  ul {
    list-style: none;
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    @media screen and (min-width: 768px) {
      flex-direction: column;
      padding-top: 20px;
    }
    li {
      width: 100%;
      a {
        position: relative;
        text-decoration: none;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        padding: 20px;
        border-right: 1px solid #7795ac;
        color: inherit;
        font-size: 0.875em;
        @media screen and (min-width: 768px) {
          justify-content: flex-start;
          border-right: 0;
          padding-right: 40px;
        }
        &.is-active {
          &:after {
            content: '';
            display: block;
            position: absolute;
            top: 100%;
            bottom: auto;
            right: 0;
            left: 0;
            width: 0;
            height: 0;
            margin: auto;
            border-style: solid;
            border-width: 8px 8px 0 8px;
            border-color: ${color.navBg} transparent transparent transparent;
            z-index: 10;
            @media screen and (min-width: 768px) {
              top: 0;
              right: auto;
              bottom: 0;
              left: 100%;
              border-width: 8px 0 8px 8px;
              border-color: transparent transparent transparent ${color.navBg};
            }
          }
        }
      }
    }
    .spHidden {
      margin-left: 0.8em;
      @media screen and (max-width: 640px) {
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
    }
  }
`

const TrackingIcon = styled(_TrackingIcon)`
  fill: #fff;
  width: 24px;
  height: 24px;
`

const SettingIcon = styled(_SettingIcon)`
  fill: #fff;
  width: 24px;
  height: 24px;
`

const PomodoroIcon = styled(_PomodoroIcon)`
  fill: #fff;
  width: 24px;
  height: 27px;
`

export default memo(Header) //memoしてもcontext使ってるので再レンダーされる？
