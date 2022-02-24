import React, { memo, useState, useEffect } from 'react'
import styled from 'styled-components'
import { SButtonBase } from './styled/SButton'
import { color } from '../theme/GlobalColor'
import {
  PlayIcon as _PlayIcon,
  StopIcon as _StopIcon,
  TimeIcon as _TimeIcon,
} from './Icon'
import { STag } from './styled/STag'
import type { TTag } from '../types/TTag'
import { printTime } from '../utils/utils'

type Props = {
  id: number
  title: string
  relatedTag: TTag[]
  dateStart: Date
}

const TimerCard: React.VFC<Props> = props => {
  console.log('Timercard is rendered')
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
      <div className="head">
        <ul className="tagCrowd">
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
        </ul>
        <h3 className="title">{title}</h3>
        <p>
          {dateStart.getMonth() + 1}/{dateStart.getDate()}
        </p>
      </div>
      <div className="body">
        <p className="time">
          <TimeIcon />
          {printTime(time, 'hour')}
        </p>
      </div>
      <div className="buttons">
        {isRunning ? (
          <SButtonBase onClick={() => setRunning(false)}>
            <StopIcon />
          </SButtonBase>
        ) : (
          <SButtonBase onClick={() => setRunning(true)}>
            <PlayIcon />
          </SButtonBase>
        )}
      </div>
    </STimerCard>
  )
}

const PlayIcon = styled(_PlayIcon)`
  fill: ${color.accent};
  width: 24px;
  height: 24px;
`

const StopIcon = styled(_StopIcon)`
  fill: ${color.accent};
  width: 24px;
  height: 24px;
`

const TimeIcon = styled(_TimeIcon)`
  fill: ${color.grayIcon};
  width: 22px;
  height: 25px;
  margin-right: 8px;
`

const STimerCard = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  margin: 0;
  padding: 16px;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.16);
  &.is-active {
    background-color: ${color.secondary};
    color: #fff;
    ${TimeIcon} {
      fill: #fff;
    }
  }

  .head {
    font-size: 1em;
    .title {
      margin: 0;
      font-size: 0.875rem;
      line-height: 1.2;
    }
    .tagCrowd {
      list-style: none;
      margin: 0 0 1rem;
      padding: 0;
      li {
        display: inline-block;
        margin: 0 0.5em 0 0;
        color: #808080;
        font-size: 0.875em;
      }
    }
  }
  .body {
    display: flex;
    align-items: center;
    margin-top: auto;
    .time {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      width: 100%;
      margin: 0;
      font-size: 1rem;
      text-align: right;
    }
  }
  .buttons {
    position: absolute;
    top: 16px;
    right: 16px;
  }
`

export default memo(TimerCard)
