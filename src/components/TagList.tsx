// import React, { memo, useContext } from 'react'
import React, { memo } from 'react'
import styled from 'styled-components'
import { color } from '../theme/GlobalColor'
// import { TagListContext } from './providers/TagListProvider'
import { STag } from './styled/STag'
import type { TTag } from '../types/TTag'

type Props = {
  tagList: TTag[]
  onChooseTag(el: TTag): void
}

const TagList: React.VFC<Props> = props => {
  console.log(' TagList is rendered')

  const { tagList, onChooseTag } = props

  // const { tagList } = useContext(TagListContext)

  return (
    <STagCrowd>
      <ul>
        {tagList.map((el, index) => {
          return (
            <li key={index}>
              <STag
                data-id={el.id}
                className={el.color}
                onClick={() => onChooseTag(el)}
              >
                {el.name}
              </STag>
            </li>
          )
        })}
      </ul>
    </STagCrowd>
  )
}

const STagCrowd = styled.div`
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    background-color: #fff;
    li {
      display: block;
      padding: 0.4rem 1.5rem;
      border-top: 1px solid ${color.grayBorder};
      &:last-child {
        border-bottom: 1px solid ${color.grayBorder};
      }
      ${STag} {
        cursor: pointer;
      }
    }
  }
`

export default memo(TagList)
