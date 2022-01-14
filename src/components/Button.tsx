import React, { memo } from 'react'
import styled from 'styled-components'

type Props = {
  onClick: () => void
  children?: string
}

const Button: React.VFC<Props> = props => {
  const { onClick, children } = props
  console.log('rendered Button')
  return <SButton onClick={onClick}>{children}</SButton>
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

export default memo(Button)
