import styled from 'styled-components'
import { color } from '../../theme/GlobalColor'

export const SCheckBox = styled.div`
  display: inline-flex;
  align-items: center;
  margin: 0 0.5em;
  > label {
    cursor: pointer;
    display: inline-flex;
    flex-shrink: 0;
    align-items: center;
    margin: 0;
    padding: 0 0 0 0.5em;
    color: ${color.grayText};
    font-size: 0.75rem;
    line-height: 1;
  }
  > input {
    display: inline-block;
    /* appearance: none; */
    border: 1px solid ${color.grayBorder};
    &:checked + label {
    }
  }
`
