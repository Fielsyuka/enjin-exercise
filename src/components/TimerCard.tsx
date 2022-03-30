import React, { memo, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { color } from '../theme/GlobalColor'
import { useSelector, useDispatch } from 'react-redux'
import type { State } from '../reducer'
import { pomodoroStatus } from '../constants/constants'
import { SButtonBase } from './styled/SButton'
import {
  PlayIcon as _PlayIcon,
  StopIcon as _StopIcon,
  TimeIcon as _TimeIcon,
} from './Icon'
import { STag } from './styled/STag'
import type { TTag } from '../types/TTag'
import type { TCard } from '../types/TCard'
import { printTime } from '../utils/utils'

type Props = {
  card: TCard
  status: string
  onEdit(): void
}

const TimerCard: React.VFC<Props> = props => {
  const { card, status, onEdit } = props

  console.log('Timercard is rendered: ', card.id)

  const activeCardID = useSelector((state: State) => state.activeCardID)
  const dispatch = useDispatch()
  const tickRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (activeCardID === card.id && status !== pomodoroStatus.break) {
      const tick = setInterval(() => {
        dispatch({
          type: 'cardList.updateTime',
          payload: card.id,
        })
      }, 1000)
      tickRef.current = tick
    } else {
      clearInterval(tickRef.current as NodeJS.Timeout)
    }
    return () => clearInterval(tickRef.current as NodeJS.Timeout)
  }, [activeCardID, status])

  return (
    <STimerCard
      data-id={card.id}
      className={activeCardID === card.id ? 'is-active' : ''}
    >
      <div className="head">
        <ul className="tagCrowd">
          {card.relatedTag &&
            card.relatedTag.map((tag: TTag, index) => {
              return (
                <li key={index}>
                  <STag data-id={tag.id} className={tag.color}>
                    {tag.name}
                  </STag>
                </li>
              )
            })}
        </ul>
        <h3 className="title">{card.title}</h3>
      </div>
      <div className="body">
        {activeCardID !== card.id && (
          <SButtonBase className="edit" onClick={onEdit}>
            Edit
          </SButtonBase>
        )}
        <p className="time">
          <TimeIcon />
          {printTime(card.time, 'hour')}
        </p>
      </div>
      <div className="buttons">
        {activeCardID === card.id ? (
          <SButtonBase
            onClick={() =>
              dispatch({
                type: 'activeCardID.setActiveCardID',
                payload: undefined,
              })
            }
          >
            <StopIcon />
          </SButtonBase>
        ) : (
          <SButtonBase
            onClick={() =>
              dispatch({
                type: 'activeCardID.setActiveCardID',
                payload: card.id,
              })
            }
          >
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
  @media screen and (min-width: 640px) {
    min-height: 170px;
  }
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
    margin-top: 2rem;
    .time {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      width: 100%;
      margin: 0;
      font-size: 1rem;
      text-align: right;
    }
    .edit {
      cursor: pointer;
      text-decoration: underline;
      margin: 0;
      color: ${color.grayText};
      font-size: 0.875em;
    }
  }
  .buttons {
    position: absolute;
    top: 16px;
    right: 16px;
  }
`

export default memo(TimerCard)
// export default TimerCard
