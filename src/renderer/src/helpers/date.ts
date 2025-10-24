import { format } from 'date-fns'
import { es } from 'date-fns/locale/es'

export const formatDate = (date: Date = new Date()) => {
  return format(date, 'dd/MM/yyyy')
}

export const formatNowDate = (date = new Date()) => {
  return format(date, 'dd-MM-yyyy')
}

export const formatWithDay = (date: Date) => {
  return format(date, 'EEEE, d LLLL', { locale: es })
}

export const formatBookingDate = (date: Date, formatSchema: string) => {
  return format(date, formatSchema, { locale: es })
}
