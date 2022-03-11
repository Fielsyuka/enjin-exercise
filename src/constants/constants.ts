import { getDateString } from '../utils/utils'

export const pomodoroStatus = {
  work: 'isWorking',
  break: 'isBreaking',
  stop: 'isStop',
}

export const initialCard = {
  id: Date.now(),
  title: '',
  time: 0,
  relatedTag: [],
  dateStart: getDateString(new Date()),
}
