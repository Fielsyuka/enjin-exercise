import React from 'react'
import styled from 'styled-components'
import { color } from '../theme/GlobalColor'
import { STag } from './styled/STag'

type Props = {
  value: string
}

const AddTag: React.VFC<Props> = props => {
  const { value } = props
  return (
    <SNewTagWrap>
      <STag>{value}</STag>
    </SNewTagWrap>
  )
}

const SNewTagWrap = styled.div`
  padding: 0.4rem 1.5rem;
  border-top: 1px solid ${color.grayBorder};
  background: #fff;
`

export default AddTag
