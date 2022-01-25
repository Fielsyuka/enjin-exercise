import styled from 'styled-components'
import { color } from '../theme/GlobalColor'

export const SInputWrap = styled.div`
  cursor: text;
  padding: 0.25em 0.5em;
  border-bottom: solid 1px #ccc;
  &:hover,
  &.is-focus {
    border-color: ${color.accent};
  }
  &.is-focus {
    outline: solid 1px transparent;
    background-color: ${color.formElBg};
  }
`
export const SInput = styled.input`
  appearance: none;
  width: 100%;
  margin: 0;
  padding: 0;
  border: 0;
  box-shadow: none;
  border-radius: 0;
  background-color: transparent;

  &:focus {
    outline: solid 1px transparent;
  }
`
