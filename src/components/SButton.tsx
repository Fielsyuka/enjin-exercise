// import React from 'react'
import styled from 'styled-components'

export const SButton = styled.button.attrs({
  type: 'button',
})`
  cursor: pointer;
  appearance: none;
  margin: 0;
  padding: 0.5em 1em;
  border: 1px solid #0f0f0f;
  box-shadow: none;
  background-color: #0f0f0f;
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
  width: 3em;
  height: 3em;
  margin: 0;
  padding: 0.5em 1em;
  border: 1px solid #0f0f0f;
  border-radius: 50%;
  box-shadow: none;
  background-color: #0f0f0f;
  color: #fff;
  text-align: center;
`
