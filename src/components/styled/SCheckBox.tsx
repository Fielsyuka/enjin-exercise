import styled from 'styled-components'
import { color } from '../../theme/GlobalColor'

export const SCheckBox = styled.input.attrs({
  type: 'checkbox',
})`
  display: none;
  + span {
    padding-left: 25px;
    margin-right: 16px;
    position: relative;
  }
  + span::before {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 16px;
    height: 16px;
    margin: auto;
    border: 1px solid ${color.grayText};
    border-radius: 0;
  }
  &:checked + span {
    color: ${color.accent};
  }
  &:checked + span::after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 6px;
    width: 5px;
    height: 10px;
    transform: rotate(40deg);
    border-bottom: 2px solid ${color.accent};
    border-right: 2px solid ${color.accent};
  }
`
