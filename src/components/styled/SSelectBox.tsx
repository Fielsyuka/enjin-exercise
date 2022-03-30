import styled from 'styled-components'
import { color } from '../../theme/GlobalColor'

export const SSelectBox = styled.select`
    display: inline-block;
    cursor: pointer;
    margin: 0;
    padding: 0.2rem 24px 0.2rem 12px;
    background-color: white;
    border: solid 1px ${color.grayBorder};;
    border-radius: 0;
    font: inherit;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }
  &::-ms-expand {
    display: none;
  }
  &.select-01 {
    padding: 0.5em 3.5em 0.5em 1em;
    background-color: #eee;
    background-image: url(../images/angle-down.png),
      linear-gradient(90deg, #d3d3d3, #d3d3d3);
    background-position: calc(100% - 0.7em) 1em, 100% 0;
    background-size: 1.2em, 2.5em 3.5em;
    background-repeat: no-repeat;

    &:focus {
      outline: 0;
    }
  }
`
