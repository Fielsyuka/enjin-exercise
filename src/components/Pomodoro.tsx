import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import type { State } from '../reducer'
import styled from 'styled-components'
import { color } from '../theme/GlobalColor'
import { convertMinToSec } from '../utils/utils'
import { pomodoroStatus } from '../constants/constants'
import PomodoroTimer from './PomodoroTimer'
import PomodoroSetting from './PomodoroSetting'
import { SButtonRadius } from './styled/SButton'
import {
  WorkingIcon as _WorkingIcon,
  BreakingIcon as _BreakingIcon,
} from './Icon'

type Props = {
  status: string
  onChangeStatus(status: string): void
  onCountOver(): void
}
const Pomodoro: React.VFC<Props> = props => {
  console.log('Pomodoro is rendered')
  const { status, onChangeStatus, onCountOver } = props

  const pomodoroWorkTime = useSelector((state: State) => state.pomodoroWorkTime)
  const pomodoroBreakTime = useSelector(
    (state: State) => state.pomodoroBreakTime,
  )

  const [timeSetting, setTimeSetting] = useState<number>(
    convertMinToSec(pomodoroWorkTime),
  )

  // statusに合わせてタイマーの時間を変更
  useEffect(() => {
    switch (status) {
      case 'isWorking':
        setTimeSetting(convertMinToSec(pomodoroWorkTime))
        break
      case 'isBreaking':
        setTimeSetting(convertMinToSec(pomodoroBreakTime))
        break
      default:
        setTimeSetting(convertMinToSec(pomodoroWorkTime))
    }
  }, [status, pomodoroWorkTime, pomodoroBreakTime])

  return (
    <>
      <section
        id="pomodoroTimer"
        className="pomodoroTimer mainContent js-switchScreen"
      >
        <div className="container">
          <h2 className="visuallyHidden">Pomodoro</h2>
          <SPomodoroTimerWrap>
            <SPomodoroMessage className={status}>
              <p className="work">
                <span className="icon">
                  <WorkingIcon />
                </span>
                {pomodoroWorkTime} <span className="min">min</span>
              </p>
              <p className="break">
                <span className="icon">
                  <BreakingIcon />
                </span>
                {pomodoroBreakTime} <span className="min">min</span>
              </p>
            </SPomodoroMessage>
            <PomodoroTimer
              status={status}
              timeSetting={timeSetting}
              onCountOver={onCountOver}
            />
          </SPomodoroTimerWrap>
          <div className="algn-c">
            {(status == pomodoroStatus.work ||
              status == pomodoroStatus.break) && (
              <SButtonRadius
                onClick={() => onChangeStatus(pomodoroStatus.stop)}
              >
                リセット
              </SButtonRadius>
            )}
            {status == pomodoroStatus.stop && (
              <SButtonRadius
                onClick={() => onChangeStatus(pomodoroStatus.work)}
              >
                スタート
              </SButtonRadius>
            )}
          </div>
        </div>
      </section>
      <section
        id="pomodoroSetting"
        className="pomodoroSetting mainContent js-switchScreen"
      >
        <div className="container">
          <h2 className="visuallyHidden">Pomodoro Setting</h2>
          <PomodoroSetting />
        </div>
      </section>
    </>
  )
}

const WorkingIcon = styled(_WorkingIcon)`
  width: 40px;
  height: 40px;
  fill: ${color.accent};
`
const BreakingIcon = styled(_BreakingIcon)`
  width: 40px;
  height: 40px;
  fill: ${color.accent};
`

const SPomodoroMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  > p {
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${color.accent};
    margin: 0 1.5rem;
    font-size: 24px;
    font-weight: normal;
    line-height: 1;
    @media screen and (min-width: 768px) {
      font-size: 28px;
    }
    .icon {
      display: block;
      margin-right: 0.5em;
    }
    .min {
      margin-left: 0.3em;
      margin-bottom: -0.6em;
      font-size: 0.6em;
    }
  }
  &.isWorking .work {
    color: ${color.working};
    ${WorkingIcon} {
      fill: ${color.working};
    }
  }
  &.isBreaking .break {
    color: ${color.breaking};
    ${BreakingIcon} {
      fill: ${color.breaking};
    }
  }
`

const SPomodoroTimerWrap = styled.div`
  position: relative;
  width: 100%;
  text-align: center;
`

export default Pomodoro
