import React, { useState, useCallback, useEffect } from 'react'
import { pomodoroSettings, pomodoroStatus } from '../constants/constants'
import PomodoroTimer from './PomodoroTimer'
import PomodoroSetting from './PomodoroSetting'
import { SButtonRadius } from './styled/SButton'

const Pomodoro = () => {
  console.log('Pomodoro is rendered')
  const [status, setStatus] = useState(pomodoroStatus.stop)
  const [timeSetting, setTimeSetting] = useState<number>(pomodoroSettings.work)

  // タイマーのカウントが0になったら呼び出す、workとbreakを切り替える
  const handleStatusChange = useCallback(() => {
    setStatus(prev => {
      return prev == pomodoroStatus.break
        ? pomodoroStatus.work
        : pomodoroStatus.break
    })
  }, [])

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
    <div className="pomodoro">
      <div
        id="pomodoroTimer"
        className="pomodoro__timer mainContent js-switchScreen"
      >
        <PomodoroTimer
          status={status}
          timeSetting={timeSetting}
          onCountOver={handleStatusChange}
        />
        <div className="algn-c">
          {(status == pomodoroStatus.work ||
            status == pomodoroStatus.break) && (
            <SButtonRadius onClick={() => setStatus(pomodoroStatus.stop)}>
              リセット
            </SButtonRadius>
          )}
          {status == pomodoroStatus.stop && (
            <SButtonRadius onClick={() => setStatus(pomodoroStatus.work)}>
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
    </div>
  )
}

export default Pomodoro
