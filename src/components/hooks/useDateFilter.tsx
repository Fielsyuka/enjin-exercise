//******  VOID *********

import { useState, useCallback } from 'react'
import type { TCard } from '../../types/TCard'

export const useDateFilter = () => {
  // アーカイブモード
  const [archiveMode, setArchiveMode] = useState<boolean>(false)

  /**
   * アーカイブモードの変更
   *
   * @param archive アーカイブを指定しているか
   */
  const handleArchive = useCallback((archive: boolean): void => {
    archive ? setArchiveMode(true) : setArchiveMode(false)
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
        : cards.filter(({ dateStart }) => dateStart >= date)
    },
    [archiveMode],
  )

  return { archiveMode, handleArchive, filterCardsByDate }
}
