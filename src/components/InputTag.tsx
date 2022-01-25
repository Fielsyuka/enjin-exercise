import React from 'react'
import styled from 'styled-components'
import { color } from '../theme/GlobalColor'
import { SInputWrap, SInput } from './SInputWrap'

type Props = {
  id: string
  value?: string
  name?: string
  autoComplete?: string
  onChange?(e: React.ChangeEvent<HTMLInputElement>): void
}

const InputTag: React.VFC<Props> = props => {
  console.log('inputTag is rendered')
  const { id, value, name, autoComplete, onChange } = props

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
    <STagSelect>
      <SInputWrap
        tabIndex={-1}
        onFocus={(e: React.FocusEvent<HTMLInputElement>) => handleFocus(e)}
        onBlur={(e: React.FocusEvent<HTMLInputElement>) => handleBlur(e)}
      >
        <SInput
          type="text"
          id={id}
          name={name}
          value={value}
          onChange={e => onChange?.(e)}
          autoComplete={autoComplete}
        />
      </SInputWrap>
      <STagCrowd>
        <p>履歴から選択</p>
        <ul>
          <li>
            <button type="button">#タグ１</button>
          </li>
          <li>
            <button type="button">#タグ２</button>
          </li>
          <li>
            <button type="button">#タグ３</button>
          </li>
        </ul>
      </STagCrowd>
    </STagSelect>
  )
}

const STagCrowd = styled.div`
  display: none;
  padding: 1em;
  background-color: #eee;
  p {
    margin: 0;
    color: #333;
    font-size: 0.75em;
  }
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    li {
      display: inline-block;
      > button {
        cursor: pointer;
        appearance: none;
        margin: 0.25em;
        padding: 0.25em 1em;
        border: none;
        box-shadow: none;
        border-radius: 50px;
        background-color: #cecece;
        font-size: 0.75em;
        &:hover,
        &:focus {
          outline: solid 1px transparent;
          background-color: ${color.primary};
          color: #fff;
        }
      }
    }
  }
`
const STagSelect = styled.div`
  &.is-focus,
  &:focus-within {
    background-color: ${color.formElBg};
    ${STagCrowd} {
      display: block;
    }
  }
`

export default InputTag
