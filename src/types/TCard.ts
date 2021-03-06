import type { TTag } from './TTag'
export type TCard = {
  id: number | string
  title: string
  time: number
  relatedTag: TTag[]
  dateStart: string
}
