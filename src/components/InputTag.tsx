import React, { useState } from 'react'
import styled from 'styled-components'
import { SInputWrap, SInput } from './styled/SInputWrap'

type Props = {
  id: string
  value: string
  name?: string
  autoComplete?: string
  onChange(e: React.ChangeEvent<HTMLInputElement>): void
  onEnter(): void
  children?: React.ReactNode
}

const InputTag: React.VFC<Props> = props => {
  console.log('inputTag is rendered')

  const { id, value, name, autoComplete, onChange, onEnter, children } = props

  // 日本語変換の監視
  const [composing, setComposing] = useState(false)

  // SInputWrapにfocusしたらinputにfocusする
  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.currentTarget.classList.add('is-focus')
    if (e.currentTarget === e.target) {
      ;(e.currentTarget.childNodes[1] as HTMLElement).focus()
    }
  }

  // focus外す
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    e.currentTarget.classList.remove('is-focus')
  }

  // 入力が終わりEnterしたら親へ通知
  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key !== 'Enter' || composing || value == '') {
      return
    }
    onEnter()
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
          onBlur={onEnter}
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
