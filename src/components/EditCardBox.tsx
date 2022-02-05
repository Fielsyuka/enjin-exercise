import React, { memo, useMemo, useState, useCallback } from 'react'
import styled from 'styled-components'
import { color } from '../theme/GlobalColor'
// import { TagListContext } from './providers/TagListProvider'
import InputText from './InputText'
import EditTag from './EditTag'
import { SButton } from './styled/SButton'
import type { TCard } from './types/TCard'
import type { TTag } from './types/TTag'

type Props = {
  mode: string
  onSubmit(card: TCard): void
}

const EditCardBox: React.VFC<Props> = props => {
  console.log('Editcardbox is rendered')

  // const context = useContext(TagListContext)
  const { mode, onSubmit } = props
  const cardId = useMemo(() => {
    if (mode === 'add') {
      return Date.now()
    } else {
      return 1
    }
  }, [])

  const [card, setCard] = useState<TCard>({
    id: cardId,
    title: '',
    time: 0,
    relatedTag: [],
    isRunning: false,
  })

  const handleChange = useCallback(e => {
    const target = e.target
    setCard(prev => {
      return { ...prev, [target.name]: target.value }
    })
  }, [])

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

  const handleRemoveTag = (tag: TTag) => {
    tag &&
      setCard(prev => {
        const index = prev.relatedTag.findIndex(val => val === tag)
        const newArr = [...prev.relatedTag]
        newArr.splice(index, 1)
        return { ...prev, relatedTag: newArr }
      })
  }

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
            name="title"
            autoComplete="on"
            value={card.title}
            onChange={e => handleChange(e)}
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

        <SButton onClick={() => addCard()}>Add Card</SButton>
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
    display: block;
    width: 100%;
    margin-bottom: 0.5em;
    padding: 0 1.5rem;
    color: ${color.grayText};
    font-size: 0.75em;
  }
`

export default memo(EditCardBox)
