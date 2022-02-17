import React, { memo, useState, useEffect } from 'react'
import styled from 'styled-components'
import { SCircleButton } from './styled/SButton'
import { color } from '../theme/GlobalColor'
import { PlayIcon as _PlayIcon } from './Icon'
import { StopIcon as _StopIcon } from './Icon'
import { STag } from './styled/STag'
import type { TTag } from './types/TTag'

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
  relatedTag: TTag[]
  dateStart: Date
}

const TimerCard: React.VFC<Props> = props => {
  let tick: NodeJS.Timer
  const { id, title, relatedTag, dateStart } = props
  const [time, setTime] = useState(0)
  const [isRunning, setRunning] = useState(false)

  useEffect(() => {
    if (isRunning) {
      tick = setInterval(() => {
        setTime(prev => prev + 1)
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
          {relatedTag &&
            relatedTag.map((tag, index) => {
              return (
                <li key={index}>
                  <STag data-id={tag.id} className={tag.color}>
                    {tag.name}
                  </STag>
                </li>
              )
            })}
        </STagCrowd>
        <p>
          {dateStart.getMonth() + 1}/{dateStart.getDate()}
        </p>
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
  width: 40px;
  height: 40px;
`

const StopIcon = styled(_StopIcon)`
  fill: ${color.accent};
  width: 40px;
  height: 40px;
`
const STimerCard = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0;
  padding: 1em 1.5em;
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
  li {
    display: inline-block;
    margin: 0.5em 0.5em 0 0;
    color: #808080;
    font-size: 0.875em;
  }
`
const STime = styled.p`
  display: inline-block;
  margin: 0 1em;
  font-size: 1em;
`
export default memo(TimerCard)
