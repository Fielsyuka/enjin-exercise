import styled from 'styled-components'
import { color } from '../../theme/GlobalColor'

export const SInputWrap = styled.div`
  overflow-x: auto;
  cursor: text;
  display: flex;
  align-items: center;
  min-height: 40px;
  padding: 0.5rem 1.5rem;
  border-top: solid 1px ${color.grayBorder};
  border-bottom: solid 1px ${color.grayBorder};
  background-color: #fff;
  &:focus-within {
    border-color: ${color.primary};
  }
`
export const SInput = styled.input`
  appearance: none;
  width: 100%;
  min-width: 8em;
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
