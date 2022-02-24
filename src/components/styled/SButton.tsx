// import React from 'react'
import styled from 'styled-components'
import { color } from '../../theme/GlobalColor'

export const SButton = styled.button.attrs({
  type: 'button',
})`
  cursor: pointer;
  appearance: none;
  margin: 0;
  padding: 0.5rem 1.5rem;
  background-color: ${color.accent};
  border: 1px solid ${color.accent};
  color: #fff;
  text-align: center;

  :hover:not(:disabled) {
    background-color: #fff;
    color: ${color.accent};
  }

  :disabled {
    background-color: #eee;
    border: #c4c4c4;
  }
`

export const SButtonRadius = styled.button.attrs({
  type: 'button',
})`
  cursor: pointer;
  appearance: none;
  margin: 0;
  padding: 0.5rem 1.5rem;
  background-color: ${color.accent};
  border: 1px solid ${color.accent};
  border-radius: 50px;
  color: #fff;
  text-align: center;
  font-size: 1.5rem;

  :hover:not(:disabled) {
    background-color: #fff;
    color: ${color.accent};
  }

  :disabled {
    background-color: #eee;
    border: #c4c4c4;
  }
`

export const SButtonBase = styled.button.attrs({
  type: 'button',
})`
  cursor: pointer;
  appearance: none;
  margin: 0;
  padding: 0;
  box-shadow: none;
  border: none;
  background: none;
  color: inherit;
  text-align: center;
`
