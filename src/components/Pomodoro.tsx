import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { color } from '../theme/GlobalColor'
import { pomodoroSettings, pomodoroStatus } from '../constants/constants'
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
  // const [status, setStatus] = useState(pomodoroStatus.stop)
  const [timeSetting, setTimeSetting] = useState<number>(pomodoroSettings.work)

  // statusに合わせてタイマーの時間を変更
  useEffect(() => {
    switch (status) {
      case 'isWorking':
        setTimeSetting(pomodoroSettings.work)
        break
      case 'isBreaking':
        setTimeSetting(pomodoroSettings.break)
        break
      default:
        setTimeSetting(pomodoroSettings.work)
    }
  }, [status])

  return (
    <>
      <div
        id="pomodoroTimer"
        className="pomodoro__timer mainContent js-switchScreen"
      >
        <SPomodoroTimerWrap>
          {/* <SPomodoroMessage>
          </SPomodoroMessage> */}
          <PomodoroTimer
            status={status}
            timeSetting={timeSetting}
            onCountOver={onCountOver}
          />
          {/* {status == pomodoroStatus.stop && <p>今日もがんばろう！</p>} */}
          {status == pomodoroStatus.work && <WorkingIcon className="icon" />}
          {status == pomodoroStatus.break && <BreakingIcon className="icon" />}
        </SPomodoroTimerWrap>
        <div className="algn-c">
          {(status == pomodoroStatus.work ||
            status == pomodoroStatus.break) && (
            <SButtonRadius onClick={() => onChangeStatus(pomodoroStatus.stop)}>
              リセット
            </SButtonRadius>
          )}
          {status == pomodoroStatus.stop && (
            <SButtonRadius onClick={() => onChangeStatus(pomodoroStatus.work)}>
              スタート
            </SButtonRadius>
          )}
        </div>
      </div>
      <div
        id="pomodoroSetting"
        className="pomodoro__setting mainContent js-switchScreen"
      >
        <PomodoroSetting />
      </div>
    </>
  )
}

const WorkingIcon = styled(_WorkingIcon)`
  width: 56px;
  height: 48px;
  fill: ${color.working};
`
const BreakingIcon = styled(_BreakingIcon)`
  width: 56px;
  height: 56px;
  fill: ${color.breaking};
`

const SPomodoroTimerWrap = styled.div`
  position: relative;
  text-align: center;
  .icon {
    position: absolute;
    right: 0;
    bottom: 32px;
    left: 0;
    margin: auto;
    @media screen and (max-width: 767.98px) {
      transform: scale(0.75);
    }
  }
`

// const SPomodoroMessage = styled.div`
//   height: 56px;
// `

export default Pomodoro
