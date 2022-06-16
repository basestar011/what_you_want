import type { Category } from './category'

export interface Content<T> {
  code: number
  title: string
  cg_code: Category['code']
  detail: T
  created: Date
  modified: Date
}

export interface Space {
  address?: string
  description?: string
  photos?: File[]
  isWent: boolean
}