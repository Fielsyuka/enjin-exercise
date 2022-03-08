import { useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { State } from '../../reducer'
import { TTag } from '../../types/TTag'

export const useEditCard = () => {
  const editingCard = useSelector((state: State) => state.editingCard)
  const tagList = useSelector((state: State) => state.tagList)
  const dispatch = useDispatch()
  const [inputTagValue, setInputTagValue] = useState('')

  /**
   * nputの値が変化したらinputのnameに応じたkeyを更新
   *
   * @param e {React.ChangeEvent<HTMLInputElement>}
   */
  const onChangeValue = useCallback(e => {
    const target = e.target
    dispatch({
      type: 'editingCard.updateEditingCard',
      payload: {
        key: [target.id],
        value: target.value,
      },
    })
  }, [])

  /**
   * 選択されたタグがrelatedTagになければ追加
   *
   * @param tag
   */
  const updateRelatedTag = useCallback(
    (tag: TTag) => {
      const newRelatedTag = [...editingCard!.relatedTag]
      if (newRelatedTag.indexOf(tag) < 0) {
        dispatch({
          type: 'editingCard.updateEditingCard',
          payload: {
            key: 'relatedTag',
            value: [...newRelatedTag, tag],
          },
        })
      }
    },
    [editingCard],
  )

  /**
   * 選択されたタグをrelatedTagから削除
   *
   * @param tag
   */
  const removeRelatedTag = useCallback(
    (tag: TTag) => {
      const newRelatedTag = [...editingCard!.relatedTag]
      const index = newRelatedTag.findIndex(val => val === tag)
      if (index >= 0) {
        newRelatedTag.splice(index, 1)
        dispatch({
          type: 'editingCard.updateEditingCard',
          payload: {
            key: 'relatedTag',
            value: newRelatedTag,
          },
        })
      }
    },
    [editingCard],
  )

  /**
   * タグ入力完了後、同じ名前のタグがtagListにあるか確認。
   * あればそのタグをrelatedTagに追加。
   * なければ新しいタグをrelatedTagとtagListに追加。
   */
  const handleAddTag = useCallback(() => {
    if (inputTagValue === '') {
      return
    }
    const sameNameTagFromTagList = tagList!.find(
      el => el.name === inputTagValue,
    )
    if (sameNameTagFromTagList) {
      updateRelatedTag(sameNameTagFromTagList)
    } else {
      const newTag = {
        id: Date.now(),
        name: inputTagValue,
        color: 'tagDefault',
      }
      updateRelatedTag(newTag)
      dispatch({
        type: 'TagList.addTag',
        payload: newTag,
      })
    }
    setInputTagValue('')
  }, [inputTagValue])

  /**
   * カードを新規追加または更新する
   */
  const updateCard = () => {
    if (editingCard!.title === '') {
      return
    }
    dispatch({
      type: 'cardList.updateCard',
      payload: {
        id: editingCard!.id,
        card: editingCard,
      },
    })
    dispatch({
      type: 'modalContent.setModalContent',
      payload: undefined,
    })
  }

  return {
    editingCard,
    tagList,
    dispatch,
    inputTagValue,
    setInputTagValue,
    onChangeValue,
    updateRelatedTag,
    removeRelatedTag,
    handleAddTag,
    updateCard,
  }
}
