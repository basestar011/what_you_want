import type { Content } from './content'

export interface Category {
  code: number
  name: string
  description?: string,
  count?: number
  contents?: Content<any>[]
}