import React, { memo, useState } from 'react'
import styled from 'styled-components'
// import { color } from '../theme/GlobalColor'
import { SButton } from './SButton'
import InputText from './InputText'
import InputTag from './InputTag'

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

  // const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
  //   console.log(e.currentTarget)
  //   e.currentTarget.classList.add('is-focus')
  // }

  // const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
  //   e.currentTarget.classList.remove('is-focus')
  // }

  const addCard = () => {
    if (task.title === '' || task.tag === '') {
      return
    }
    onSubmit(task)
  }

  return (
    <>
      <SBox>
        <div className="row">
          <label htmlFor="title">タイムトラック名</label>
          <InputText
            id="title"
            name="title"
            onChange={e => handleChange(e)}
            value={task.title}
          />
        </div>
        <div className="row">
          <label htmlFor="tag">タグ</label>
          <InputTag
            id="tag"
            name="tag"
            autoComplete="off"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange(e)
            }
            value={task.tag}
          />
        </div>
        <SButton onClick={() => addCard()}>Add Task</SButton>
      </SBox>
    </>
  )
}

const SBox = styled.div`
  overflow: auto;
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
    margin-bottom: 1em;
    /* display: flex; */
  }

  label {
    display: block;
    width: 100%;
    margin-bottom: 0.25em;
    font-size: 0.875em;
  }
`

export default memo(AddCardBox)
