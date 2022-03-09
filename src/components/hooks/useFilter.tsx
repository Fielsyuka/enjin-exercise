import { useState, useMemo, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { State } from '../../reducer'
import { getDateString } from '../../utils/utils'
import type { TCard } from '../../types/TCard'

const today = getDateString(new Date())

export const useFilter = () => {
  const cardList = useSelector((state: State) => state.cardList)

  // アーカイブ（全ての日時）
  const [archiveMode, setArchiveMode] = useState<boolean>(false)

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
   * カードリストを日付でフィルター
   *
   * @param cards TCardの配列
   * @param date 絞り込むDate
   * @return フィルター後のcards
   */
  const filterCardsByDate = useCallback(
    (cards: TCard[], date: string) => {
      return archiveMode
        ? cards
        : cards.filter(({ dateStart }) => dateStart === date)
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
          checkedTags.some(id => relatedTag.some(tag => tag.id === id)),
        )
      } else {
        return cards
      }
    },
    [cardList, checkedTags],
  )

  /**--- カードのフィルター ---**/
  const filterdCards = useMemo(
    () => filterCardsByDate(cardList, today),
    [cardList, archiveMode],
  )
  const cards = useMemo(
    () => filterCardsByTag(filterdCards),
    [cardList, checkedTags],
  )

  return {
    archiveMode,
    checkedTags,
    handleArchive,
    handleCheckTag,
    cards,
  }
}
