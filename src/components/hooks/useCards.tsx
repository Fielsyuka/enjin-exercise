import { useState, useCallback } from 'react'
import { getTodayDate } from '../../utils/utils'
import type { TCard } from '../../types/TCard'

const today = getTodayDate()
export const useCards = () => {
  /**--- State ---**/
  // カードリスト
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

  // アーカイブモード（日付全てを選択）
  const [archiveMode, setArchiveMode] = useState<boolean>(false)

  // カードの追加または編集モード
  const [addMode, setAddMode] = useState<boolean>(false)

  // チェックされたタグ格納
  const [checkedTags, setCheckedTags] = useState<number[]>([])

  /**--- 関数 ---**/
  /**
   * アーカイブモードの変更
   *
   * @param archive アーカイブを指定しているか
   */
  const handleArchive = useCallback((archive: boolean): void => {
    archive ? setArchiveMode(true) : setArchiveMode(false)
  }, [])

  /**
   * チェックしたタグの名前がcheckedTagsにあれば追加、無ければ削除
   *
   * @param tagId タグのid
   */
  const handleCheckTag = useCallback(
    (tagId: number) => {
      if (checkedTags.includes(tagId)) {
        setCheckedTags(prev => {
          const index = prev.findIndex(val => val === tagId)
          const newArr = [...prev]
          newArr.splice(index, 1)
          return newArr
        })
      } else {
        setCheckedTags(prev => {
          return [...prev, tagId]
        })
      }
    },
    [checkedTags],
  )

  /**
   * カードの再生・停止
   *
   * @param cardId カードのid
   * @param running 再生true / 停止false
   *
   */
  const handleRunning = useCallback((cardId, running) => {
    setCardList(prev => {
      // 一旦全てをisRunning: falseに
      const newCardList = [...prev]
      newCardList.map(card => {
        return (card.isRunning = false)
      })

      // 選択したカードをisRunningに
      const targetCard = newCardList.find(el => el.id === cardId)
      if (targetCard) {
        targetCard.isRunning = running
      }
      return newCardList
    })
  }, [])

  /**
   * カードの時間を更新
   *
   * @param cardId カードのid
   *
   */
  const updateTime = useCallback(cardId => {
    setCardList(prev => {
      const newCardList = [...prev]
      const targetCard = newCardList.find(el => el.id === cardId)
      if (targetCard) {
        targetCard.time += 1
      }
      return newCardList
    })
  }, [])

  // カードの追加と編集モードの終了
  const addCard = useCallback((card: TCard) => {
    setAddMode(false)
    setCardList(prev => {
      return [card, ...prev]
    })
  }, [])

  /**
   * カードリストを日付でフィルター
   *
   * @param cards TCardの配列
   * @param date 絞り込むDate
   * @return フィルター後のcards
   */
  const filterCardsByDate = useCallback(
    (cards: TCard[], date: Date) => {
      return archiveMode
        ? cards
        : cards.filter(({ dateStart }) => dateStart.getDate() == date.getDate())
    },
    [cardList, archiveMode],
  )

  /**
   * カードリストをtagFilterValueでフィルター
   *
   * @param cards TCardの配列
   * @return フィルター後のcards
   */
  const filterCardsByTag = useCallback(
    (cards: TCard[]) => {
      if (checkedTags.length > 0) {
        return cards.filter(({ relatedTag }) =>
          checkedTags.some(id => relatedTag.some(tag => tag.id == id)),
        )
      } else {
        return cards
      }
    },
    [cardList, checkedTags],
  )

  /**--- カードのフィルター ---**/
  const filterdCards = filterCardsByDate(cardList, today)
  const cards = filterCardsByTag(filterdCards)

  return {
    cards,
    checkedTags,
    handleCheckTag,
    handleArchive,
    handleRunning,
    updateTime,
    addCard,
    addMode,
    setAddMode,
  }
}
