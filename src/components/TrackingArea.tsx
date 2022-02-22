import React, { useState } from 'react'
import styled from 'styled-components'
import { getTodayDate } from '../utils/utils'
import { useTagFilter } from './hooks/useTagFIlter'
import { useDateFilter } from './hooks/useDateFilter'
import TrackingHeader from './TrackingHeader'
import TimerCard from './TimerCard'
import EditCardBox from './EditCardBox'
import { SOverlay } from './styled/SOverlay'
import { PlusIcon as _PlusIcon } from './Icon'
import type { TCard } from '../types/TCard'

const today = getTodayDate()

const TrackingArea = () => {
  console.log('TrackingArea is rendered')

  /**--- カスタムフック ---**/
  // タグフィルター
  const { checkedTags, handleCheckTag, filterCardsByTag } = useTagFilter()

  // 日付フィルター
  const { handleArchive, filterCardsByDate } = useDateFilter()

  /**--- State ---**/
  // カードリスト（JSONへ切り出す予定のデータ）
  const [cardList, setCardList] = useState<TCard[]>([
    {
      id: 0,
      title: 'トップページコーディング',
      relatedTag: [],
      time: 0,
      isRunning: false,
      dateStart: new Date('December 17, 2021 00:00:00'),
    },
    {
      id: 1,
      title: '下層コーディング',
      relatedTag: [
        {
          id: 0,
          name: 'Project A',
          color: 'primary',
        },
      ],
      time: 0,
      isRunning: false,
      dateStart: today,
    },
    {
      id: 2,
      title: 'CSS設計',
      relatedTag: [
        {
          id: 1,
          name: 'Project B',
          color: 'tagPink',
        },
      ],
      time: 0,
      isRunning: false,
      dateStart: new Date('January 10, 2022 00:00:00'),
    },
    {
      id: 3,
      title: 'ミーティング',
      relatedTag: [
        {
          id: 1,
          name: 'Project B',
          color: 'tagPink',
        },
      ],
      time: 0,
      isRunning: false,
      dateStart: today,
    },
  ])

  // カードの追加または編集モード
  const [addMode, setAddMode] = useState<boolean>(false)

  // アクティブなカード
  // const [activeCardId, setActiveCardId] = useState<number>()

  /**--- 定数・変数 ---**/
  const filterdCards = filterCardsByDate(cardList, today)
  const cards = filterCardsByTag(filterdCards)

  /**--- 関数 ---**/
  // カードの追加と編集モードの終了
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
      <TrackingHeader
        checkedTags={checkedTags}
        handleCheckTag={handleCheckTag}
        handleArchive={handleArchive}
      />
      <SButtonAdd onClick={() => setAddMode(true)}>
        <SPlusIcon />
        タイムトラックを追加する
      </SButtonAdd>
      {cards &&
        cards.map((card, index) => {
          return (
            <TimerCard
              id={index}
              key={index}
              title={card.title}
              relatedTag={card.relatedTag}
              dateStart={card.dateStart}
            />
          )
        })}
      {addMode && (
        <>
          <EditCardBox mode="add" onSubmit={el => addCard(el)} />
          <SOverlay onClick={() => setAddMode(false)} />
        </>
      )}
    </STrackingWrap>
  )
}

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
  /* position: absolute;
  right: 0;
  bottom: 0;
  left: 0; */
  width: 100%;
  padding: 1.5em;
  border: 0;
  /* box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.2); */
  background-color: #ebebeb;
  text-align: center;
`

const SPlusIcon = styled(_PlusIcon)`
  width: 16px;
  height: 16px;
  margin-right: 1em;
`

export default TrackingArea
