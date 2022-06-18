import type { Category } from './category'
import type { Media } from './media'

export interface Content<T> {
  code: number
  title: string
  cg_code: Category['code']
  detail: T
  date?: Date, 
  images?: Media[]
  created: Date
  modified: Date
}

export interface Space {
  address?: string
  description?: string
  isWent: boolean
}