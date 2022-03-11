import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import type { State } from '../reducer'
import styled from 'styled-components'
import { color } from '../theme/GlobalColor'
import { SSelectBox } from './styled/SSelectBox'
import BGMSetting from './BGMSetting'
import {
  WorkingIcon as _WorkingIcon,
  BreakingIcon as _BreakingIcon,
} from './Icon'

const PomodoroSetting = () => {
  const pomodoroWorkTime = useSelector((state: State) => state.pomodoroWorkTime)
  const pomodoroBreakTime = useSelector(
    (state: State) => state.pomodoroBreakTime,
  )
  const dispatch = useDispatch()
  return (
    <>
      <STitle>時間設定</STitle>
      <STimeSetting>
        <div className="row">
          <div className="col">
            <WorkingIcon />
          </div>
          <div className="col flex">
            <label htmlFor="workTime">作業時間</label>
            <SSelectBox
              name="workTime"
              id="workTime"
              value={pomodoroWorkTime}
              onChange={e =>
                dispatch({
                  type: 'pomodoroWorkTime.setPomodoroWorkTime',
                  payload: e.currentTarget.value,
                })
              }
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
              <option value="25">25</option>
              <option value="30">30</option>
              <option value="35">35</option>
              <option value="40">40</option>
              <option value="45">45</option>
              <option value="50">50</option>
              <option value="55">55</option>
              <option value="60">60</option>
            </SSelectBox>
            <span className="min">分</span>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <BreakingIcon />
          </div>
          <div className="col flex">
            <label htmlFor="breakTime">休憩時間</label>
            <SSelectBox
              name="breakTime"
              id="breakTime"
              value={pomodoroBreakTime}
              onChange={e =>
                dispatch({
                  type: 'pomodoroBreakTime.setPomodoroBreakTime',
                  payload: e.currentTarget.value,
                })
              }
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
              <option value="25">25</option>
              <option value="30">30</option>
              <option value="35">35</option>
              <option value="40">40</option>
              <option value="45">45</option>
              <option value="50">50</option>
              <option value="55">55</option>
              <option value="60">60</option>
            </SSelectBox>
            <span className="min">分</span>
          </div>
        </div>
      </STimeSetting>
      <STitle>BGM設定</STitle>
      <BGMSetting />
    </>
  )
}

const WorkingIcon = styled(_WorkingIcon)`
  width: 40px;
  height: 40px;
  margin-right: 0.5rem;
  fill: ${color.accent};
`
const BreakingIcon = styled(_BreakingIcon)`
  width: 40px;
  height: 40px;
  margin-right: 0.5rem;
  fill: ${color.accent};
`

const STitle = styled.h3`
  margin-top: 0;
  padding-bottom: 0.2em;
  border-bottom: 1px solid #ccc;
`

const STimeSetting = styled.div`
  margin-bottom: 40px;
  @media screen and (min-width: 480px) {
    display: flex;
    align-items: center;
  }
  @media screen and (min-width: 768px) {
    margin-bottom: 60px;
  }

  .row {
    display: flex;
    align-items: center;
  }

  .row + .row {
    margin: 1rem 0 0;
    @media screen and (min-width: 480px) {
      margin: 0 0 0 2rem;
    }
  }

  .flex {
    display: flex;
    align-items: center;
  }

  label {
    margin: 0 1rem 0 0;
  }

  span.min {
    margin-left: 0.5rem;
  }
`

export default PomodoroSetting
