import React, { memo } from 'react'
// import React, { useContext } from 'react'
import styled from 'styled-components'
import { color } from '../theme/GlobalColor'
// import { TagListContext } from './providers/TagListProvider'
import { SCheckBox } from './styled/SCheckBox'
import { TTag } from '../types/TTag'

type Props = {
  archiveMode: boolean
  tagList: TTag[]
  checkedTags: number[]
  handleCheckTag(id: number): void
  handleArchive(archive: boolean): void
}

const TimeTrackHeader: React.VFC<Props> = props => {
  console.log('TimeTrackHeader is rendered')
  const { archiveMode, tagList, checkedTags, handleCheckTag, handleArchive } =
    props
  // const { tagList } = useContext(TagListContext)

  return (
    <STimeTrackHeader>
      <h2 className="visuallyHidden">Time Tracking</h2>
      <div className="row">
        <button
          className="today"
          data-archive-mode={archiveMode}
          onClick={() => handleArchive(false)}
        >
          今日
        </button>
        <button
          className="archive"
          data-archive-mode={archiveMode}
          onClick={() => handleArchive(true)}
        >
          アーカイブ
        </button>
      </div>
      <div className="row">
        {tagList.map((tag, index) => {
          return (
            <label key={index}>
              <SCheckBox
                type="checkbox"
                onChange={() => handleCheckTag(tag.id)}
                value={tag.name}
                name={tag.name}
                id={tag.name}
                checked={checkedTags.includes(tag.id)}
              />
              <span>{tag.name}</span>
            </label>
          )
        })}
      </div>
    </STimeTrackHeader>
  )
}

const STimeTrackHeader = styled.div`
  margin-bottom: 24px;
  border-bottom: 1px solid #ccc;
  .row {
    display: flex;
    margin-bottom: 16px;
  }
  button {
    cursor: pointer;
    appearance: none;
    padding: 0.25em 1em;
    margin-right: 8px;
    border: 0;
    box-shadow: none;
    border: 1px solid ${color.accent};
    border-radius: 50px;
    color: ${color.accent};
    font-family: inherit;
    font-size: inherit;
    &.today[data-archive-mode='false'] {
      background-color: ${color.accent};
      color: #fff;
    }
    &.archive[data-archive-mode='true'] {
      background-color: ${color.accent};
      color: #fff;
    }
  }
`

export default memo(TimeTrackHeader)
