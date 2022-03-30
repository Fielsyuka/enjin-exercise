import React, { createContext, useState } from 'react'
import { pomodoroStatus } from '../../constants/constants'

type PomodoroStatus = {
  status: string
  setStatus: React.Dispatch<React.SetStateAction<string>>
}

export const StatusContext = createContext({} as PomodoroStatus)
export const StatusProvider = (props: any) => {
  const { children } = props

  const [status, setStatus] = useState(pomodoroStatus.stop)

  return (
    <StatusContext.Provider value={{ status, setStatus }}>
      {children}
    </StatusContext.Provider>
  )
}
