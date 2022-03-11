import { Reducer } from 'redux'
import { initialCard } from './constants/constants'
import type { TTag } from './types/TTag'
import type { TCard } from './types/TCard'

export type State = {
  tagList: TTag[]
  cardList: TCard[]
  activeCardID?: number
  editingCard?: TCard
  modalContent?: string
  pomodoroWorkTime: number
  pomodoroBreakTime: number
}

const localCardList = localStorage.getItem('cardList')
const localTagList = localStorage.getItem('tagList')
const localWorkTime = localStorage.getItem('workTime')
const localBreakTime = localStorage.getItem('breakTime')

const persistedCardsState = localCardList ? JSON.parse(localCardList) : []
const persistedTagsState = localTagList ? JSON.parse(localTagList) : []
const persistedWorkTime = localWorkTime ? JSON.parse(localWorkTime) : 25
const persistedBreakTime = localBreakTime ? JSON.parse(localBreakTime) : 5

const initialState = {
  activeCardID: undefined,
  editingCard: initialCard,
  cardList: persistedCardsState,
  tagList: persistedTagsState,
  pomodoroWorkTime: persistedWorkTime,
  pomodoroBreakTime: persistedBreakTime,
}

export type Action =
  | {
      type: 'TagList.addTag'
      payload: TTag
    }
  | {
      type: 'TagList.removeTag'
      payload: TTag
    }
  | {
      type: 'cardList.removeCard'
      payload: TCard
    }
  | {
      type: 'cardList.updateCard'
      payload: {
        id: number
        card: TCard
      }
    }
  | {
      type: 'cardList.updateTime'
      payload: number
    }
  | {
      type: 'activeCardID.setActiveCardID'
      payload: number | undefined
    }
  | {
      type: 'editingCard.setEditingCard'
      payload: TCard
    }
  | {
      type: 'editingCard.updateEditingCard'
      payload: {
        key: string
        value: string | number | TTag[] | boolean
      }
    }
  | {
      type: 'modalContent.setModalContent'
      payload: string | undefined
    }
  | {
      type: 'pomodoroWorkTime.setPomodoroWorkTime'
      payload: number
    }
  | {
      type: 'pomodoroBreakTime.setPomodoroBreakTime'
      payload: number
    }

export const reducer: Reducer<State, Action> = (
  state: State = initialState,
  action: Action,
) => {
  switch (action.type) {
    case 'TagList.addTag': {
      const index = [...state.tagList!].findIndex(
        tag => tag.name === action.payload.name,
      )
      if (index >= 0) {
        return state
      }
      return { ...state, tagList: [action.payload, ...state.tagList!] }
    }
    case 'TagList.removeTag': {
      const newTagList = [...state.tagList!]
      const index = newTagList.findIndex(tag => tag.id === action.payload.id)
      if (index < 0) {
        return state
      }
      newTagList.splice(index, 1)
      return {
        ...state,
        tagList: newTagList,
      }
    }
    case 'cardList.removeCard': {
      const newCardList = [...state.cardList!]
      const index = newCardList.findIndex(card => card.id === action.payload.id)
      if (index < 0) {
        return state
      }
      newCardList.splice(index, 1)
      return {
        ...state,
        cardList: newCardList,
      }
    }
    case 'cardList.updateCard': {
      const newCardList = [...state.cardList!]
      const index = newCardList.findIndex(card => card.id === action.payload.id)
      if (index >= 0) {
        newCardList[index] = action.payload.card
      } else {
        newCardList.unshift(action.payload.card)
      }
      return {
        ...state,
        cardList: newCardList,
      }
    }
    case 'cardList.updateTime': {
      const newCardList = [...state.cardList!]
      const targetCard = newCardList.find(card => card.id === action.payload)
      if (targetCard) {
        targetCard.time += 1
      }
      return {
        ...state,
        cardList: newCardList,
      }
    }
    case 'activeCardID.setActiveCardID': {
      return {
        ...state,
        activeCardID: action.payload,
      }
    }
    case 'editingCard.setEditingCard': {
      return {
        ...state,
        editingCard: action.payload,
      }
    }
    case 'editingCard.updateEditingCard': {
      if (state.editingCard == undefined) {
        return state
      }
      return {
        ...state,
        editingCard: {
          ...state.editingCard,
          [action.payload.key]: action.payload.value,
        },
      }
    }
    case 'modalContent.setModalContent': {
      return {
        ...state,
        modalContent: action.payload,
      }
    }
    case 'pomodoroWorkTime.setPomodoroWorkTime': {
      return {
        ...state,
        pomodoroWorkTime: action.payload,
      }
    }
    case 'pomodoroBreakTime.setPomodoroBreakTime': {
      return {
        ...state,
        pomodoroBreakTime: action.payload,
      }
    }
    default:
      return state
  }
}
