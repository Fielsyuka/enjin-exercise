import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { color } from '../theme/GlobalColor'
import { TagListContext } from './providers/TagListProvider'
import InputTag from './InputTag'
import TagList from './TagList'
import AddTag from './AddTag'
import { SInputWrap } from './styled/SInputWrap'
import { STagDelete } from './styled/STag'
import { TTag } from '../types/TTag'

type Props = {
  relatedTag: TTag[]
  onChooseTag(tag: TTag): void
  onRemoveTag(tag: TTag): void
}

const EditTag: React.VFC<Props> = props => {
  console.log(' EditTag is rendered')

  const { relatedTag, onChooseTag, onRemoveTag } = props

  // InputTagで入力中の値
  const [tag, setTag] = useState('')

  // 登録済みのタグリスト
  const { setTagList } = useContext(TagListContext)

  // タグの入力が終わったら、タグリストに新しく追加、inputを空にする、追加したタグを親へ通知
  const handleEnter = () => {
    if (tag == '') {
      return
    }
    const newTag: TTag = {
      id: Date.now(),
      name: tag,
      color: 'tagDefault',
    }
    setTagList(prev => {
      return [newTag, ...prev]
    })
    setTag('')
    onChooseTag(newTag)
  }

  return (
    <SEditTagWrap>
      <InputTag
        id="tag"
        name="tagId"
        value={tag}
        autoComplete="off"
        onChange={e => setTag(e.currentTarget.value)}
        onEnter={() => handleEnter()}
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
    </SEditTagWrap>
  )
}

const SEditTagWrap = styled.div`
  &:focus-within {
    > ${SInputWrap} {
      border-color: ${color.primary};
    }
  }
`
const STagListTtl = styled.p`
  margin: 1em 0 0;
  padding: 0 1.5rem 0.4rem;
  color: ${color.grayText};
  font-size: 0.75em;
`

export default EditTag
