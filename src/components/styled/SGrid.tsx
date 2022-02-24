import styled from 'styled-components'

export const SGrid = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin: -12px;
`

export const SGridItem = styled.div`
  display: flex;
  width: 100%;
  margin: 12px;
  @media screen and (min-width: 640px) {
    width: calc(50% - 24px);
  }
  @media screen and (min-width: 960px) {
    width: calc(33.3333% - 24px);
  }
`
