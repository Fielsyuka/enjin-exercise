import React, { useState, useCallback } from 'react'
import { pomodoroStatus } from './constants/constants'
import Header from './components/Header'
import Pomodoro from './components/Pomodoro'
import TimeTrack from './components/TimeTrack'
import { TagListProvider } from './components/providers/TagListProvider'

const App = () => {
  const [status, setStatus] = useState(pomodoroStatus.stop)

  const onChangeStatus = useCallback(status => {
    setStatus(status)
  }, [])

  // ポモドーロのカウントが0になったらworkとbreakを切り替える
  const onCountOver = useCallback(() => {
    setStatus(prev => {
      return prev == pomodoroStatus.break
        ? pomodoroStatus.work
        : pomodoroStatus.break
    })
  }, [])
  return (
    <>
      <Header status={status} />
      <main className={status + ' main'}>
        <Pomodoro
          status={status}
          onChangeStatus={onChangeStatus}
          onCountOver={onCountOver}
        />
        <TagListProvider>
          <TimeTrack status={status} />
        </TagListProvider>
      </main>
    </>
  )
}

export default App
