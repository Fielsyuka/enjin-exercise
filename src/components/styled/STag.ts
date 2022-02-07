import styled from 'styled-components'
import { color } from '../../theme/GlobalColor'

export const STag = styled.div`
  appearance: none;
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  margin: 0 4px 0 0;
  padding: 0.2rem 0.4rem;
  border: none;
  box-shadow: none;
  border-radius: 4px;
  background-color: ${color.tagDefault};
  color: #fff;
  font-size: 0.75rem;
  line-height: 1;
  &.primary {
    background-color: ${color.primary};
  }
  &.tagPink {
    background-color: ${color.tagPink};
  }
`

export const STagDelete = styled(STag)`
    position: relative;
    &:after {
      content: '\0d7';
      cursor: pointer;
      display: inline-block;
      margin: 0 0 0 4px;
      border-radius: 50%;
      font-size: 14px;
      color: #fff;
      line-height: 1;
    }
  }
`
