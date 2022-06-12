import moment from 'moment'

export function formatDate(date: Date, format?: string): string {
  return moment(date).locale('ko').format(format ?? 'YYYY.MM.DD.');
}