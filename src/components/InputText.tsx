// InputText
// input自体はappearance:noneでSInputWrapにスタイル適用
// valueは親コンポーネントで管理

import React from 'react'
import { SInputWrap, SInput } from './styled/SInputWrap'

type Props = {
  id: string
  value?: string
  autoComplete?: string
  placeholder?: string
  onChange?(e: React.ChangeEvent<HTMLInputElement>): void
}

const InputText: React.VFC<Props> = props => {
  const { id, value, autoComplete, placeholder, onChange } = props

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.currentTarget.classList.add('is-focus')
    if (e.currentTarget === e.target) {
      ;(e.currentTarget.childNodes[0] as HTMLElement).focus()
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    e.currentTarget.classList.remove('is-focus')
  }

  return (
    <SInputWrap
      tabIndex={-1}
      onFocus={(e: React.FocusEvent<HTMLInputElement>) => handleFocus(e)}
      onBlur={(e: React.FocusEvent<HTMLInputElement>) => handleBlur(e)}
    >
      <SInput
        type="text"
        id={id}
        value={value}
        placeholder={placeholder}
        onChange={e => onChange?.(e)}
        autoComplete={autoComplete}
      />
    </SInputWrap>
  )
}

export default InputText
