// import React from 'react'
import styled from 'styled-components'
import { color } from '../theme/GlobalColor'

export const SButton = styled.button.attrs({
  type: 'button',
})`
  cursor: pointer;
  appearance: none;
  margin: 0;
  background-color: ${color.accent};
  border: 1px solid ${color.accent};
  color: #fff;
  text-align: center;

  :hover:not(:disabled) {
    background-color: #fff;
    color: #0f0f0f;
  }

  :disabled {
    background-color: #eee;
    border: #c4c4c4;
  }
`

export const SCircleButton = styled.button.attrs({
  type: 'button',
})`
  cursor: pointer;
  appearance: none;
  width: 40px;
  height: 40px;
  margin: 0;
  padding: 0;
  box-shadow: none;
  border: none;
  background: none;
  color: #fff;
  text-align: center;
`
