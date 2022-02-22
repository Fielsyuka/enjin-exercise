import React, { useState, useCallback, useEffect } from 'react'
import { pomodoroSettings, pomodoroStatus } from '../constants/constants'
import PomodoroTimer from './PomodoroTimer'
import VideoFrame from './VideoFrame'

// statusがwoking

const PomodoroArea = () => {
  console.log('PomodoroArea is rendered')
  const [status, setStatus] = useState(pomodoroStatus.stop)
  const [timeSetting, setTimeSetting] = useState<number>(pomodoroSettings.work)

  const handleStatusChange = useCallback(() => {
    setStatus(prev => {
      return prev == pomodoroStatus.break
        ? pomodoroStatus.work
        : pomodoroStatus.break
    })
  }, [])

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
      <PomodoroTimer
        status={status}
        timeSetting={timeSetting}
        onCountOver={handleStatusChange}
      />
      <VideoFrame />
    </>
  )
}

export default PomodoroArea
