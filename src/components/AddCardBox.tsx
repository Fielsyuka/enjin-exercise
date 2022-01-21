import React, { memo, useState } from 'react'
import styled from 'styled-components'
// import color from '../theme/GlobalColor'
import { InputForm } from './InputForm'
import { SButton } from './SButton'

type Props = {
  onSubmit(task: object): void
}

const AddCardBox: React.VFC<Props> = props => {
  const { onSubmit } = props
  console.log('addcardbox is rendered')
  const [title, setTitle] = useState('')
  // const [tags, setTags] = useState([])

  // const addCard = () => {
  //   console.log({ title })
  //   return { title }
  // }

  return (
    <>
      <SBox>
        <SLabel htmlFor="title">プロジェクト/タスク</SLabel>
        <InputForm id="title" onChange={setTitle} value={title} />
        {/* <SLabel htmlFor="tag">プロジェクト/タスク</SLabel>
        <InputForm id="tag" onChange={settag} value={tag} /> */}
        <SButton onClick={() => onSubmit({ title })}>Add Task</SButton>
      </SBox>
    </>
  )
}

const SBox = styled.div`
  /* position: absolute;
  right: 0;
  bottom: 0;
  left: 0; */
  padding: 24px 16px;
  background-color: #fff;
  box-shadow: 0 0 16px 0 rgba(0, 0, 0, 0.1);
`
const SLabel = styled.label`
  display: block;
  margin-bottom: 0.5em;
`
export default memo(AddCardBox)
