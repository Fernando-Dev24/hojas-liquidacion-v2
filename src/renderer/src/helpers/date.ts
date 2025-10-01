import { format } from 'date-fns'

export const formatDate = (date: Date = new Date()) => {
  console.log(date)
  return format(date, 'dd/MM/yyyy')
}
