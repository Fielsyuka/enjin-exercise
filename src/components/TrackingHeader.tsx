import React, { useContext } from 'react'
import { TagListContext } from './providers/TagListProvider'
import { STagCheck } from './styled/STag'

type Props = {
  checkedTags: number[]
  handleCheckTag(id: number): void
  handleArchive(archive: boolean): void
}

const TrackingHeader: React.VFC<Props> = props => {
  console.log('TrackingHeader is rendered')
  const { checkedTags, handleCheckTag, handleArchive } = props
  const { tagList } = useContext(TagListContext)

  return (
    <header>
      <button onClick={() => handleArchive(false)}>今日</button>
      <button onClick={() => handleArchive(true)}>全て</button>
      <p>フィルター</p>
      {tagList.map((tag, index) => {
        return (
          <STagCheck key={index}>
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
          </STagCheck>
        )
      })}
    </header>
  )
}

export default TrackingHeader
