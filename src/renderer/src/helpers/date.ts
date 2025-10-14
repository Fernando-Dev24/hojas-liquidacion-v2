import { format } from 'date-fns'
import { es } from 'date-fns/locale/es'
import { Timestamp } from 'firebase/firestore'

export const formatDate = (date: Date = new Date()) => {
  return format(date, 'dd/MM/yyyy')
}

export const formatFirebaseDate = (date: Timestamp | Date) => {
  if (date instanceof Timestamp) {
    return format(date.toDate(), 'dd/MM/yyyy')
  }

  return ''
}

export const formatNowDate = (date = new Date()) => {
  return format(date, 'dd-MM-yyyy')
}

export const formatWithDay = (date: Date) => {
  return format(date, 'EEEE, d LLLL', { locale: es })
}
