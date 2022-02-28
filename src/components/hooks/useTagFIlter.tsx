//******  VOID *********

import { useState, useCallback } from 'react'
import type { TCard } from '../../types/TCard'

export const useTagFilter = () => {
  // チェックされたタグ格納
  const [checkedTags, setCheckedTags] = useState<number[]>([])

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
    [checkedTags],
  )

  return { checkedTags, handleCheckTag, filterCardsByTag }
}
