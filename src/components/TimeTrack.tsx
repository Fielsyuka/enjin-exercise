import React, { useState } from 'react'
import styled from 'styled-components'
import { getTodayDate } from '../utils/utils'
import { useTagFilter } from './hooks/useTagFIlter'
import { useDateFilter } from './hooks/useDateFilter'
import TimeTrackHeader from './TimeTrackHeader'
import TimerCard from './TimerCard'
import EditCardBox from './EditCardBox'
import { SOverlay } from './styled/SOverlay'
import { SGrid, SGridItem } from './styled/SGrid'
import { PlusIcon as _PlusIcon } from './Icon'
import type { TCard } from '../types/TCard'

const today = getTodayDate()

const TimeTrack = () => {
  console.log('TimeTrack is rendered')

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
      return [card, ...prev]
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
    <div id="timeTrack" className="timeTrack mainContent js-switchScreen">
      <TimeTrackHeader
        checkedTags={checkedTags}
        handleCheckTag={handleCheckTag}
        handleArchive={handleArchive}
      />
      <SGrid>
        <SGridItem>
          <SButtonAdd onClick={() => setAddMode(true)}>
            <SPlusIcon />
            新規追加
          </SButtonAdd>
        </SGridItem>
        {cards &&
          cards.map((card, index) => {
            return (
              <SGridItem key={index}>
                <TimerCard
                  id={index}
                  title={card.title}
                  relatedTag={card.relatedTag}
                  dateStart={card.dateStart}
                />
              </SGridItem>
            )
          })}
      </SGrid>
      {addMode && (
        <>
          <EditCardBox mode="add" onSubmit={el => addCard(el)} />
          <SOverlay onClick={() => setAddMode(false)} />
        </>
      )}
    </div>
  )
}

const SButtonAdd = styled.button.attrs({
  type: 'button',
})`
  appearance: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 0;
  padding: 32px 16px;
  border-radius: 8px;
  border: 2px dashed #777;
  background-color: transparent;
`

const SPlusIcon = styled(_PlusIcon)`
  width: 16px;
  height: 16px;
  margin-right: 1em;
`

export default TimeTrack
