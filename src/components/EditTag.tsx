// EditTag
// タグを新規追加:contextに追加＆親へrelatedTagを伝える
//

import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import { color } from '../theme/GlobalColor'
// import { TagListContext } from './providers/TagListProvider'
import InputTag from './InputTag'
import TagList from './TagList'
import AddTag from './AddTag'
import { STagDelete } from './styled/STag'
import { TTag } from './types/TTag'

type Props = {
  relatedTag: TTag[]
  onChooseTag(tag: TTag): void
  onRemoveTag(tag: TTag): void
}

const EditTag: React.VFC<Props> = props => {
  console.log(' EditTag is rendered')

  const { relatedTag, onChooseTag, onRemoveTag } = props

  const [tag, setTag] = useState('')

  const addNewTag = useCallback(tag => {
    setTag('')
    onChooseTag(tag)
  }, [])

  return (
    <>
      <InputTag
        id="tag"
        name="tagId"
        value={tag}
        autoComplete="off"
        onChange={e => setTag(e.currentTarget.value)}
        onEnter={tag => addNewTag(tag)}
      >
        {relatedTag.length > 0
          ? Array.from(relatedTag).map((tag, index) => {
              return (
                <STagDelete
                  className={tag.color}
                  key={index}
                  data-id={tag.id}
                  onClick={() => onRemoveTag(tag)}
                >
                  {tag.name}
                </STagDelete>
              )
            })
          : ''}
      </InputTag>
      <STagListTtl>タグ一覧から選択 または 新規追加</STagListTtl>
      {tag == '' ? (
        <TagList onChooseTag={tag => onChooseTag(tag)} />
      ) : (
        <AddTag value={tag} />
      )}
    </>
  )
}

const STagListTtl = styled.p`
  margin: 1em 0 0;
  padding: 0 1.5rem 0.4rem;
  color: ${color.grayText};
  font-size: 0.75em;
`

export default EditTag
