import { getDateString } from '../utils/utils'
export const pomodoroSettings = {
  work: 3000,
  break: 600,
}

export const pomodoroStatus = {
  work: 'isWorking',
  break: 'isBreaking',
  stop: 'isStop',
}

export const localKeys = {
  cards: 'cards',
  tags: 'tags',
}

export const initialCard = {
  id: Date.now(),
  title: '',
  time: 0,
  relatedTag: [],
  dateStart: getDateString(new Date()),
}
