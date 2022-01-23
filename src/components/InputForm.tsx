import React from 'react'
import styled from 'styled-components'
import { color } from '../theme/GlobalColor'

type Props = {
  id: string
  value?: string
  name?: string
  onChange?(e: React.ChangeEvent<HTMLInputElement>): void
}

export const InputForm: React.VFC<Props> = props => {
  console.log('input is rendered')
  const { id, value, name, onChange } = props
  return (
    <SInput
      type="text"
      id={id}
      name={name}
      value={value}
      onChange={e => onChange?.(e)}
    />
  )
}

const SInput = styled.input.attrs({
  type: 'text',
})`
  appearance: none;
  width: 100%;
  margin-bottom: 0.5em;
  border: solid 1px #ccc;
  border-radius: 4px;
  padding: 0.5em 1em;
  background-color: ${color.formElBg};
`
