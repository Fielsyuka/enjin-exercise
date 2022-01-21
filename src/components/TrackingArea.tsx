// import React, { memo, useState, useCallback } from 'react'
import React, { memo, useState } from 'react'
import styled from 'styled-components'
import TimerCard from './TimerCard'
import AddCardBox from './AddCardBox'
// import { SButton } from './SButton'

const TrackingArea = () => {
  const [cardList, setCardList] = useState([
    {
      id: 0,
      title: 'トップページコーディング',
      tag: ['Project A'],
      time: 0,
      isRunning: false,
    },
    {
      id: 1,
      title: '下層コーディング',
      tag: ['Project A'],
      time: 0,
      isRunning: false,
    },
  ])

  // TimerCardのisRunningが変化した時に親へ時間と状態を伝えてもらう

  // リストデータ整形とセット
  const addCard = (el: object) => {
    setCardList(prev => {
      const initial = {
        id: prev.length,
        title: '',
        tag: [],
        time: 0,
        isRunning: false,
      }
      const newItem = { ...initial, ...el }
      return [...prev, newItem]
    })
  }

  // const deleteCard = useCallback(id => {
  //   setCardList(prev => {
  //     const newList = [...prev]
  //     newList.splice(id, 1)
  //     return newList
  //   })
  // }, [])

  return (
    <STrackingWrap>
      {cardList &&
        cardList.map((el, index) => {
          return (
            <TimerCard id={index} key={index} title={el.title} tag={el.tag} />
          )
        })}
      {/* <SButton onClick={() => deleteCard(0)}>Remove Card</SButton> */}
      <AddCardBox onSubmit={el => addCard(el)} />
    </STrackingWrap>
  )
}
export default memo(TrackingArea)

const STrackingWrap = styled.div`
  position: relative;
  height: 100%;
  padding: 40px;
`
