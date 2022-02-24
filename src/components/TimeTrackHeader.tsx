import React, { useContext } from 'react'
import styled from 'styled-components'
import { TagListContext } from './providers/TagListProvider'
import { SCheckBox } from './styled/SCheckBox'

type Props = {
  checkedTags: number[]
  handleCheckTag(id: number): void
  handleArchive(archive: boolean): void
}

const TimeTrackHeader: React.VFC<Props> = props => {
  console.log('TimeTrackHeader is rendered')
  const { checkedTags, handleCheckTag, handleArchive } = props
  const { tagList } = useContext(TagListContext)

  return (
    <STimeTrackHeader>
      <button onClick={() => handleArchive(false)}>今日</button>
      <button onClick={() => handleArchive(true)}>全て</button>
      {tagList.map((tag, index) => {
        return (
          <SCheckBox key={index}>
            <input
              type="checkbox"
              onChange={() => handleCheckTag(tag.id)}
              value={tag.name}
              name={tag.name}
              id={tag.name}
              checked={checkedTags.includes(tag.id)}
            />
            <label htmlFor={tag.name} className={tag.color}>
              {tag.name}
            </label>
          </SCheckBox>
        )
      })}
    </STimeTrackHeader>
  )
}

const STimeTrackHeader = styled.div`
  margin-bottom: 24px;
  padding-bottom: 24px;
  border-bottom: 1px solid #ccc;
`

export default TimeTrackHeader
