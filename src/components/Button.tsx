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
  cursor: pointer
  display: inline-block;
  appearance: none;
  color: #fff;
  text-align: center;

  :hover:not(:disabled) {
    background-color: #fff;
    color: #0f0f0f;
  }
`

export default memo(Button)
