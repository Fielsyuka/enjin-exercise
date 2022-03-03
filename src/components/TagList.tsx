// import React, { memo, useContext } from 'react'
import React, { memo } from 'react'
import styled from 'styled-components'
import { color } from '../theme/GlobalColor'
import { SButtonBase } from './styled/SButton'
// import { TagListContext } from './providers/TagListProvider'
import { STag } from './styled/STag'
import type { TTag } from '../types/TTag'

type Props = {
  tagList: TTag[]
  removeTagList(id: number): void
  onChooseTag(el: TTag): void
}

const TagList: React.VFC<Props> = props => {
  console.log(' TagList is rendered')

  const { tagList, removeTagList, onChooseTag } = props

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
              <SButtonBase
                className="delete"
                onClick={() => removeTagList(el.id)}
              >
                Delete
              </SButtonBase>
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
      position: relative;
      display: block;
      padding: 0.4rem 1.5rem;
      border-top: 1px solid ${color.grayBorder};
      &:last-child {
        border-bottom: 1px solid ${color.grayBorder};
      }
      ${STag} {
        cursor: pointer;
      }
      .delete {
        display: none;
      }
      &:hover > .delete {
        display: block;
        position: absolute;
        text-decoration: underline;
        right: 1.5rem;
        top: 0;
        bottom: 0;
        margin: auto;
        color: ${color.grayText};
        font-size: 0.875em;
        line-height: 1;
      }
    }
  }
`

export default memo(TagList)
