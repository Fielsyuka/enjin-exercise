import React, { memo, useState } from 'react'
import styled from 'styled-components'
// import color from '../theme/GlobalColor'
import { InputForm } from './InputForm'
import { SButton } from './SButton'

type Props = {
  onSubmit(task: object): void
}

type Task = {
  title?: string
  tag?: string
}

const AddCardBox: React.VFC<Props> = props => {
  const { onSubmit } = props
  console.log('addcardbox is rendered')
  const [task, setTask] = useState<Task>({
    title: '',
    tag: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target
    setTask(prev => {
      return { ...prev, [target.name]: target.value }
    })
  }

  return (
    <>
      <SBox>
        <div className="row">
          <label htmlFor="title">プロジェクト/タスク</label>
          <InputForm
            id="title"
            name="title"
            onChange={e => handleChange(e)}
            value={task.title}
          />
        </div>
        <div className="row">
          <label htmlFor="tag">タグ</label>
          <InputForm
            id="tag"
            name="tag"
            onChange={e => handleChange(e)}
            value={task.tag}
          />
        </div>
        <SButton onClick={() => onSubmit(task)}>Add Task</SButton>
      </SBox>
    </>
  )
}

const SBox = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 90%;
  height: 90%;
  margin: auto;
  padding: 24px 16px;
  background-color: #fff;
  box-shadow: 0 0 16px 0 rgba(0, 0, 0, 0.1);
  z-index: 20;
  .row {
    display: flex;
  }

  label {
    display: block;
    flex-shrink: 0;
    width: 30%;
    margin-bottom: 0.5em;
  }
`

export default memo(AddCardBox)
