import React, { useState } from 'react'
import styled from 'styled-components'
import { getTodayDate } from '../utils/utils'
import { TrackingHeader } from './TrackingHeader'
import TimerCard from './TimerCard'
import EditCardBox from './EditCardBox'
import { SOverlay } from './styled/SOverlay'
import { PlusIcon as _PlusIcon } from './Icon'
import type { TCard } from './types/TCard'

const TrackingArea = () => {
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
      dateStart: getTodayDate(),
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
      dateStart: getTodayDate(),
    },
  ])

  // カードの追加または編集モード
  const [addMode, setAddMode] = useState<boolean>(false)

  // アーカイブモード
  const [archiveMode, setArchiveMode] = useState<boolean>(false)

  // アクティブなカード
  // const [activeCardId, setActiveCardId] = useState<number>()

  // タグフィルター
  const [tagFilterValue, setTagFilterValue] = useState<number[]>([])

  /**--- 定数 ---**/
  // カードリストを日付でフィルター
  const dateFilterdCards = archiveMode
    ? cardList
    : cardList.filter(({ dateStart }) => dateStart >= getTodayDate())

  // カードリストをタグでフィルター
  const tagFilterdCards = dateFilterdCards.filter(({ relatedTag }) =>
    tagFilterValue.some(id => relatedTag.some(tag => tag.id == id)),
  )

  // 最終的に表示するカード
  const cards = tagFilterdCards.length > 0 ? tagFilterdCards : dateFilterdCards

  /**--- 関数 ---**/
  /**
   * アーカイブモードの変更
   *
   * @param archive アーカイブを指定しているか
   */
  const handleFilterToday = (archive: boolean): void => {
    archive ? setArchiveMode(true) : setArchiveMode(false)
  }

  /**
   * フィルターでクリックされたタグをtagFilterValueに追加または削除
   *
   * @param checked タグがcheckされているか
   * @param id クリックされたタグのid
   */
  const handleFilterTag = (checked: boolean, id: number): void => {
    if (checked) {
      // フィルター追加
      setTagFilterValue(prev => {
        if (prev.includes(id)) {
          return [...prev]
        } else {
          return [...prev, id]
        }
      })
    } else {
      // フィルター解除
      setTagFilterValue(prev => {
        const index = prev.findIndex(val => val === id)
        const newArr = [...prev]
        newArr.splice(index, 1)
        return newArr
      })
    }
  }

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
        onSelectTag={(checked, id) => handleFilterTag(checked, id)}
        onSelectArchive={archive => handleFilterToday(archive)}
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
export default TrackingArea

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
