// import React, { memo, useState, useCallback } from 'react'
import React, { memo, useState } from 'react'
import styled from 'styled-components'
import TimerCard from './TimerCard'
import EditCardBox from './EditCardBox'
import { SOverlay } from './styled/SOverlay'
import { PlusIcon as _PlusIcon } from './Icon'
import type { TCard } from './types/TCard'

const TrackingArea = () => {
  const [addMode, setAddMode] = useState(false) // eslint-disable-line
  const [cardList, setCardList] = useState<TCard[]>([
    {
      id: 0,
      title: 'トップページコーディング',
      relatedTag: [],
      time: 0,
      isRunning: false,
    },
    {
      id: 1,
      title: '下層コーディング',
      relatedTag: [{ id: 0, name: 'Project A', color: 'tagPink' }],
      time: 0,
      isRunning: false,
    },
  ])

  // TimerCardのisRunningが変化した時に親へ時間と状態を伝えてもらう

  // リストデータ整形とセット
  const addCard = (card: TCard) => {
    setAddMode(false)
    setCardList(prev => {
      return [...prev, card]
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
            <TimerCard
              id={index}
              key={index}
              title={el.title}
              relatedTag={el.relatedTag}
            />
          )
        })}
      {/* <SButton onClick={() => deleteCard(0)}>Remove Card</SButton> */}
      <SButtonAdd onClick={() => setAddMode(true)}>
        <PlusIcon />
        タイムトラックを追加する
      </SButtonAdd>
      {addMode && (
        <>
          <EditCardBox onSubmit={el => addCard(el)} mode="add" />
          <SOverlay onClick={() => setAddMode(false)} />
        </>
      )}
    </STrackingWrap>
  )
}
export default memo(TrackingArea)

const STrackingWrap = styled.div`
  position: relative;
  height: 100%;
  padding: 0;
`

const SButtonAdd = styled.button.attrs({
  type: 'button',
})`
  appearance: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 1.5em;
  border: 0;
  /* box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.2); */
  background-color: #ebebeb;
  text-align: center;
`

const PlusIcon = styled(_PlusIcon)`
  width: 16px;
  height: 16px;
  margin-right: 1em;
`
