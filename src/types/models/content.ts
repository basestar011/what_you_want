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

/**
 * 테스트용 타입 추가
 */
export interface Wish {
  wishdate?: Date
  description?: string
  done: boolean
}

export interface DetailType<T> {
  name: T
  type: T extends 'space' ? Space : T extends 'wish' ? Wish : {}
}

/**
 * 각 detail form별 validate 할 수 있는 validate 함수 인터페이스
 * 걸린 경우 alert로 노출할 수 있는 message(string) 반환
 */
export interface ContentValidate {
  (): string
}