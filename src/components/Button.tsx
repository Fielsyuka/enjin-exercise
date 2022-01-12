import React from 'react'
import styled from 'styled-components'

type Props = {
  children?: string
}

export const Button: React.FC<Props> = ({ children }) => {
  return <ButtonPrimary>{children}</ButtonPrimary>
}

const ButtonPrimary = styled.button.attrs({
  type: 'button',
})`
  appearance: none;
  padding: 1em;
  background-color: #eee;
`
