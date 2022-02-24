import React, { useCallback } from 'react'
import styled from 'styled-components'
import { color } from '../theme/GlobalColor'

const Header = () => {
  // ナビゲーションクリックで画面切り替え
  const handleSwitchScreen = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault()
      const currentNavItem = e.target as HTMLElement

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
                計測
              </a>
            </li>
            <li>
              <a
                href="#pomodoroTimer"
                onClick={handleSwitchScreen}
                className="js-navSwitchTrigger"
              >
                時計
              </a>
            </li>
            <li>
              <a
                href="#pomodoroSetting"
                onClick={handleSwitchScreen}
                className="js-navSwitchTrigger"
              >
                設定
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
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    li {
      width: 100%;
      a {
        position: relative;
        text-decoration: none;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        padding: 1em;
        color: inherit;
        &.is-active {
          &:after {
            content: '';
            display: block;
            position: absolute;
            top: 0;
            bottom: 0;
            left: 100%;
            width: 0;
            height: 0;
            margin: auto;
            border-style: solid;
            border-width: 8px 0 8px 8px;
            border-color: transparent transparent transparent ${color.navBg};
            z-index: 10;
          }
        }
      }
    }
  }
`

export default Header
