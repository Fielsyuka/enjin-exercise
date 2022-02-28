import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import { color } from '../theme/GlobalColor'
import InputText from './InputText'
import EditTag from './EditTag'
import { DeleteIcon as _DeleteIcon } from './Icon'
import { SButton, SButtonBase } from './styled/SButton'
import type { TCard } from '../types/TCard'
import type { TTag } from '../types/TTag'

type Props = {
  tagList: TTag[]
  handleTagList(tag: TTag): number
  cardEditing: TCard
  onSubmit(card: TCard): void
  onDelete(id: string | number): void
}

const EditCardBox: React.VFC<Props> = props => {
  console.log('Editcardbox is rendered')

  const { tagList, handleTagList, cardEditing, onSubmit, onDelete } = props
  const [card, setCard] = useState(cardEditing)

  // inputの値が変化したらinputのnameに応じたkeyを更新（今はtitleしかないけど）
  const handleChangeInput = useCallback(e => {
    const target = e.target
    setCard(prev => {
      return { ...prev, [target.id]: target.value }
    })
  }, [])

  /**
   * 選択されたタグがrelatedTagになければ追加
   *
   * @param tag EditTag > TagListから選択したタグobject
   */
  const handleChooseTag = useCallback((tag: TTag) => {
    tag &&
      setCard(prev => {
        if (prev.relatedTag.indexOf(tag) < 0) {
          return { ...prev, relatedTag: [...prev.relatedTag, tag] }
        } else {
          return { ...prev }
        }
      })
  }, [])

  /**
   * 選択されたタグをrelatedTagから削除
   *
   * @param tag EditTag > InputTag > STagDelete
   */
  const handleRemoveTag = useCallback((tag: TTag) => {
    tag &&
      setCard(prev => {
        const index = prev.relatedTag.findIndex(val => val === tag)
        const newArr = [...prev.relatedTag]
        newArr.splice(index, 1)
        return { ...prev, relatedTag: newArr }
      })
  }, [])

  // カード追加（親へ渡す）
  const addCard = () => {
    if (card.title === '') {
      return
    }
    onSubmit(card)
  }

  return (
    <>
      <SBox>
        <div className="row">
          <label htmlFor="title">タイトル</label>
          <InputText
            id="title"
            autoComplete="on"
            value={card.title}
            onChange={e => handleChangeInput(e)}
          />
        </div>

        <div className="row">
          <label htmlFor="tag">タグ</label>
          <EditTag
            tagList={tagList}
            handleTagList={handleTagList}
            relatedTag={card.relatedTag}
            onChooseTag={tag => handleChooseTag(tag)}
            onRemoveTag={tag => handleRemoveTag(tag)}
          />
        </div>

        <SButtonWrap>
          <SButtonBase onClick={() => onDelete(card.id)}>
            <DeleteIcon />
            <span className="visuallyHidden">Delete</span>
          </SButtonBase>
          <SButton
            onClick={() => addCard()}
            disabled={card.title !== '' ? false : true}
          >
            完了
          </SButton>
        </SButtonWrap>
      </SBox>
    </>
  )
}

const DeleteIcon = styled(_DeleteIcon)`
  width: 18px;
  height: 24px;
  fill: ${color.red};
`

const SButtonWrap = styled.div`
  position: absolute;
  display: flex;
  justify-content: space-between;
  bottom: 24px;
  right: 24px;
  left: 24px;
  margin-top: 40px;
  text-align: right;
`

const SBox = styled.div`
  overflow: auto;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 90%;
  max-height: 80%;
  margin: auto;
  padding: 32px 0;
  background-color: ${color.grayBg};
  box-shadow: 0 0 16px 0 rgba(0, 0, 0, 0.1);
  z-index: 20;
  @media screen and (min-width: 768px) {
    width: 50%;
    min-width: 320px;
  }
  .row {
    margin-bottom: 1em;
  }
  label {
    display: block;
    width: 100%;
    margin-bottom: 0.5em;
    padding: 0 24px;
    color: ${color.grayText};
    font-size: 0.75em;
  }
`

export default EditCardBox
