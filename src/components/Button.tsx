import React from 'react'
import styled from 'styled-components'

type Props = {
  children?: string
}

export const Button: React.FC<Props> = ({ children }) => {
  return <SButton>{children}</SButton>
}

const SButton = styled.button.attrs({
  type: 'button',
})`
  appearance: none;
  padding: 1em;
  border: none;
  box-shadow: none;
  background-color: #0f0f0f;
  color: #fff;
`
