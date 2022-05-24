import type { Category } from './category'

export interface Content<T> {
  code: number
  title: string
  detail?: T
  cg_code: Category['code']
}

export interface Space {
  address?: string
  description?: string
  isWent: boolean
}