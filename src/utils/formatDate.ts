import moment from 'moment'

export function formatDate(date: Date): string {
  return moment(date).locale('ko').format('YYYY.MM.DD.');
}