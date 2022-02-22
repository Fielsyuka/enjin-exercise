import React, { createContext, useState } from 'react'
import type { TTag } from '../../types/TTag'

type TTagContext = {
  tagList: TTag[]
  setTagList: React.Dispatch<React.SetStateAction<TTag[]>>
}

export const TagListContext = createContext({} as TTagContext)
export const TagListProvider = (props: any) => {
  const { children } = props

  const [tagList, setTagList] = useState<TTag[]>([
    {
      id: 0,
      name: 'Project A',
      color: 'primary',
    },
    {
      id: 1,
      name: 'Project B',
      color: 'tagPink',
    },
  ])

  return (
    <TagListContext.Provider value={{ tagList, setTagList }}>
      {children}
    </TagListContext.Provider>
  )
}
