import React, { memo, useState, FC, useEffect } from 'react'
import styled from 'styled-components'
import { SCircleButton } from './SButton'
import { color } from '../theme/GlobalColor'

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
          <SCircleButton onClick={() => setRunning(false)}>■</SCircleButton>
        ) : (
          <SCircleButton onClick={() => setRunning(true)}>▶︎</SCircleButton>
        )}
      </SBody>
    </STimerCard>
  )
}

const STimerCard = styled.div`
  margin: 1em auto;
  padding: 1em;
  border: 2px solid #c1c1c1;
  border-radius: 8px;
  box-shadow: 0 0 6px 2px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  &.is-active {
    border-color: ${color.accent};
  }
`
const SHead = styled.div`
  padding-bottom: 0.5em;
  font-size: 1em;
  /* text-align: center; */
  border-bottom: 1px solid #707070;
`
const SBody = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1em;
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
  margin: 0 1em 0 0;
  color: ${color.accent};
  font-size: 2.4rem;
`
export default memo(TimerCard)
