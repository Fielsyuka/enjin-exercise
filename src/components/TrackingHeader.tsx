import React, { useContext } from 'react'
import { TagListContext } from './providers/TagListProvider'
import { STagCheck } from './styled/STag'

type Props = {
  onSelectTag(checked: boolean, id: number): void
  onSelectArchive(archive: boolean): void
}

export const TrackingHeader: React.VFC<Props> = props => {
  const { onSelectTag, onSelectArchive } = props
  const { tagList } = useContext(TagListContext)
  return (
    <header>
      <button onClick={() => onSelectArchive(false)}>今日</button>
      <button onClick={() => onSelectArchive(true)}>全て</button>
      <p>フィルター</p>
      {tagList.map((tag, index) => {
        return (
          <STagCheck key={index}>
            <input
              type="checkbox"
              onChange={e => onSelectTag(e.target.checked, tag.id)}
              value={tag.name}
              name={tag.name}
              id={tag.name}
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
