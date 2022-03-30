import React from 'react'
import { useEditCard } from './hooks/useEditCard'
import styled from 'styled-components'
import { color } from '../theme/GlobalColor'
import InputText from './InputText'
import { DeleteIcon as _DeleteIcon } from './Icon'
import { InputTag } from './InputTag'
import { SButton, SButtonBase } from './styled/SButton'
import { SInputWrap } from './styled/SInputWrap'
import { STagDelete } from './styled/STag'
import { STag } from './styled/STag'

const EditCardBox = () => {
  const {
    editingCard,
    tagList,
    inputTagValue,
    setInputTagValue,
    onChangeValue,
    updateRelatedTag,
    removeRelatedTag,
    handleAddTag,
    removeTag,
    updateCard,
    removeCard,
  } = useEditCard()

  console.log('Editcardbox is rendered.')
  console.log(editingCard)

  return (
    <>
      <SBox>
        <div className="row">
          <label htmlFor="title">タイトル</label>
          <InputText
            id="title"
            autoComplete="on"
            value={editingCard!.title}
            onChange={e => onChangeValue(e)}
          />
        </div>

        <div className="row">
          <label htmlFor="tag">タグ</label>
          <SEditTagWrap>
            <InputTag
              id="tag"
              name="tagId"
              inputTagValue={inputTagValue}
              autoComplete="off"
              onChange={e => setInputTagValue(e.target.value)}
              onEnter={() => handleAddTag()}
            >
              {editingCard!.relatedTag.length > 0
                ? Array.from(editingCard!.relatedTag).map((tag, index) => {
                    return (
                      <STagDelete
                        className={tag.color}
                        key={index}
                        data-id={tag.id}
                        onClick={() => removeRelatedTag(tag)}
                      >
                        {tag.name}
                      </STagDelete>
                    )
                  })
                : ''}
            </InputTag>
            {tagList !== undefined && (
              <STagListTtl>タグ一覧から選択 または 新規追加</STagListTtl>
            )}
            {inputTagValue == '' ? (
              <STagList>
                <ul>
                  {tagList!.map((el, index) => {
                    return (
                      <li key={index}>
                        <STag
                          data-id={el.id}
                          className={el.color}
                          onClick={() => updateRelatedTag(el)}
                        >
                          {el.name}
                        </STag>
                        <SButtonBase
                          className="delete"
                          onClick={() => removeTag(el)}
                        >
                          Delete?
                        </SButtonBase>
                      </li>
                    )
                  })}
                </ul>
              </STagList>
            ) : (
              <SNewTagWrap>
                <STag>{inputTagValue}</STag>
              </SNewTagWrap>
            )}
          </SEditTagWrap>
        </div>

        <SButtonWrap>
          <SButtonBase onClick={() => removeCard(editingCard!)}>
            <DeleteIcon />
            <span className="visuallyHidden">Delete</span>
          </SButtonBase>
          <SButton
            onClick={() => updateCard()}
            disabled={editingCard!.title !== '' ? false : true}
          >
            完了
          </SButton>
        </SButtonWrap>
      </SBox>
    </>
  )
}

const DeleteIcon = styled(_DeleteIcon)`
  width: 18px;
  height: 24px;
  fill: ${color.red};
`

const SButtonWrap = styled.div`
  position: absolute;
  display: flex;
  justify-content: space-between;
  bottom: 24px;
  right: 24px;
  left: 24px;
  margin-top: 40px;
  text-align: right;
`

const SBox = styled.div`
  overflow: auto;
  position: fixed;
  top: 10%;
  right: 0;
  bottom: 0;
  left: 0;
  width: 90%;
  height: calc(100% - 124px);
  margin: auto;
  padding: 32px 0;
  background-color: ${color.grayBg};
  box-shadow: 0 0 16px 0 rgba(0, 0, 0, 0.1);
  z-index: 20;
  @media screen and (min-width: 768px) {
    top: 0;
    left: calc(124px + 15%);
    width: 40%;
    min-width: 320px;
    height: 80%;
  }
  .row {
    margin-bottom: 1em;
  }
  label {
    display: block;
    width: 100%;
    margin-bottom: 0.5em;
    padding: 0 24px;
    color: ${color.grayText};
    font-size: 0.75em;
  }
`
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
const STagList = styled.div`
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

const SNewTagWrap = styled.div`
  padding: 0.4rem 1.5rem;
  border-top: 1px solid ${color.grayBorder};
  background: #fff;
`

export default EditCardBox
