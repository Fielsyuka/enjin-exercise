import React, { memo, useState, FC, useEffect } from 'react'
import styled from 'styled-components'
import { SCircleButton } from './SButton'
import { color } from '../theme/GlobalColor'
import { PlayIcon as _PlayIcon } from './Icon'
import { StopIcon as _StopIcon } from './Icon'

const formatTime = (i: number | string) => {
  if (i < 10) {
    i = '0' + i
  }
  return i
}

const printTime = (i: number) => {
  const hour = formatTime(Math.floor(i / 3600))
  const minute = formatTime(Math.floor(i / 60))
  const sec = formatTime(i % 60)
  const time = `${hour}:${minute}:${sec}`
  return time
}

type Props = {
  id: number
  title: string
  tag: Array<string>
  // children: React.ReactNode
}

const TimerCard: FC<Props> = props => {
  let tick: NodeJS.Timer
  const { id, title, tag } = props
  const [time, setTime] = useState(0)
  const [isRunning, setRunning] = useState(false)
  // const [isRunning, setRunning] = useState(false)

  useEffect(() => {
    if (isRunning) {
      tick = setInterval(() => {
        setTime(prev => prev + 10)
      }, 1000)
    } else {
      clearInterval(tick)
    }
    return () => clearInterval(tick)
  }, [isRunning])

  return (
    <STimerCard data-id={id} className={isRunning ? 'is-active' : ''}>
      <SHead>
        <STitle>{title}</STitle>
        <STagCrowd>
          <STag>#{tag}</STag>
        </STagCrowd>
      </SHead>
      <SBody>
        <STime>{printTime(time)}</STime>
        {isRunning ? (
          <SCircleButton onClick={() => setRunning(false)}>
            <StopIcon />
          </SCircleButton>
        ) : (
          <SCircleButton onClick={() => setRunning(true)}>
            <PlayIcon />
          </SCircleButton>
        )}
      </SBody>
    </STimerCard>
  )
}

const PlayIcon = styled(_PlayIcon)`
  fill: ${color.accent};
`

const StopIcon = styled(_StopIcon)`
  fill: ${color.accent};
`
const STimerCard = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0;
  padding: 1em;
  border-bottom: 1px solid #c1c1c1;
  background-color: #fff;
  &.is-active {
    background-color: ${color.accent};
    color: #fff;
    ${StopIcon} {
      fill: #fff;
    }
  }
`
const SHead = styled.div`
  font-size: 1em;
`
const SBody = styled.div`
  display: flex;
  align-items: center;
`
const STitle = styled.h3`
  margin: 0;
  font-size: 1em;
  line-height: 1.2;
`
const STagCrowd = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`
const STag = styled.li`
  display: inline-block;
  margin: 0.5em 1em 0 0;
  color: #808080;
  font-size: 0.875em;
`
const STime = styled.p`
  display: inline-block;
  margin: 0 1em;
  font-size: 1.125em;
`
export default memo(TimerCard)
