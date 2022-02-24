import React, { useMemo, useState, useCallback } from 'react'
import styled from 'styled-components'
import { getTodayDate } from '../utils/utils'
import { color } from '../theme/GlobalColor'
import InputText from './InputText'
import EditTag from './EditTag'
import { SButton } from './styled/SButton'
import type { TCard } from '../types/TCard'
import type { TTag } from '../types/TTag'

type Props = {
  mode: string
  onSubmit(card: TCard): void
}

const EditCardBox: React.VFC<Props> = props => {
  console.log('Editcardbox is rendered')

  const { mode, onSubmit } = props

  // タイムスタンプでカードのIDを作成
  const cardId = useMemo(() => {
    if (mode === 'add') {
      return Date.now()
    } else {
      return 1
    }
  }, [])

  // 新しく追加するカード
  const [card, setCard] = useState<TCard>({
    id: cardId,
    title: '',
    time: 0,
    relatedTag: [],
    isRunning: false,
    dateStart: getTodayDate(),
  })

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
  const handleChooseTag = (tag: TTag) => {
    tag &&
      setCard(prev => {
        if (prev.relatedTag.indexOf(tag) < 0) {
          return { ...prev, relatedTag: [...prev.relatedTag, tag] }
        } else {
          return { ...prev }
        }
      })
  }

  /**
   * 選択されたタグをrelatedTagから削除
   *
   * @param tag EditTag > InputTag > STagDelete
   */
  const handleRemoveTag = (tag: TTag) => {
    tag &&
      setCard(prev => {
        const index = prev.relatedTag.findIndex(val => val === tag)
        const newArr = [...prev.relatedTag]
        newArr.splice(index, 1)
        return { ...prev, relatedTag: newArr }
      })
  }

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
            relatedTag={card.relatedTag}
            onChooseTag={tag => handleChooseTag(tag)}
            onRemoveTag={tag => handleRemoveTag(tag)}
          />
        </div>

        <SButton
          onClick={() => addCard()}
          disabled={card.title !== '' ? false : true}
        >
          Add Card
        </SButton>
      </SBox>
    </>
  )
}

const SBox = styled.div`
  overflow: auto;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 80%;
  min-width: 320px;
  height: 100%;
  margin: 0;
  padding: 24px 0;
  background-color: ${color.grayBg};
  box-shadow: 0 0 16px 0 rgba(0, 0, 0, 0.1);
  z-index: 20;
  .row {
    margin-bottom: 1em;
  }
  label {
    padding: 0 1.5rem;
  }
`

export default EditCardBox
