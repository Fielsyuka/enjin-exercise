// InputText
// input自体はappearance:noneでSInputWrapにスタイル適用
// valueは親コンポーネントで管理

import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { TagListContext } from './providers/TagListProvider'
import { SInputWrap, SInput } from './styled/SInputWrap'
import type { TTag } from './types/TTag'

type Props = {
  id: string
  value: string
  name?: string
  autoComplete?: string
  onChange(e: React.ChangeEvent<HTMLInputElement>): void
  onEnter(tag: TTag): void
  children?: React.ReactNode
}

const InputTag: React.VFC<Props> = props => {
  console.log('inputTag is rendered')
  const { id, value, name, autoComplete, onChange, onEnter, children } = props
  const { setTagList } = useContext(TagListContext)
  const [composing, setComposing] = useState(false)

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.currentTarget.classList.add('is-focus')
    if (e.currentTarget === e.target) {
      ;(e.currentTarget.childNodes[1] as HTMLElement).focus()
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    e.currentTarget.classList.remove('is-focus')
  }

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key !== 'Enter' || composing) {
      return
    }
    const newTag: TTag = {
      id: Date.now(),
      name: value,
      color: 'tagDefault',
    }
    setTagList(prev => {
      return [newTag, ...prev]
    })
    onEnter(newTag)
  }

  return (
    <>
      <SInputWrap
        tabIndex={-1}
        onFocus={(e: React.FocusEvent<HTMLInputElement>) => handleFocus(e)}
        onBlur={(e: React.FocusEvent<HTMLInputElement>) => handleBlur(e)}
      >
        <STagWrap>{children}</STagWrap>
        <SInput
          type="text"
          id={id}
          name={name}
          value={value}
          onChange={e => onChange(e)}
          autoComplete={autoComplete}
          onCompositionStart={() => setComposing(true)}
          onCompositionEnd={() => setComposing(false)}
          onKeyDown={e => handleEnter(e)}
        />
      </SInputWrap>
    </>
  )
}

export default InputTag

const STagWrap = styled.div`
  display: flex;
  flex-shrink: 0;
  flex-wrap: nowrap;
  align-items: center;

  > * {
    margin-right: 0.5em;
  }
`
