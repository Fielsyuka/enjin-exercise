import React, { useState } from 'react'
import styled from 'styled-components'
import { SInputWrap, SInput } from './styled/SInputWrap'

type Props = {
  id: string
  name?: string
  inputTagValue: string
  autoComplete?: string
  onChange?(e: React.ChangeEvent<HTMLInputElement>): void
  onEnter(): void
  children?: React.ReactNode
}

export const InputTag: React.VFC<Props> = props => {
  console.log('inputTag is rendered')

  const { id, name, inputTagValue, autoComplete, onChange, onEnter, children } =
    props

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
    if (e.key !== 'Enter' || composing || inputTagValue == '') {
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
          value={inputTagValue}
          autoComplete={autoComplete}
          onCompositionStart={() => setComposing(true)}
          onCompositionEnd={() => setComposing(false)}
          onKeyDown={e => handleEnter(e)}
          onChange={e => onChange?.(e)}
          onBlur={onEnter}
        />
      </SInputWrap>
    </>
  )
}

const STagWrap = styled.div`
  display: flex;
  flex-shrink: 0;
  flex-wrap: nowrap;
  align-items: center;

  > * {
    margin-right: 0.5em;
  }
`
