import numeral from 'numeral'

// Cargar un locale
numeral.register('locale', 'es', {
  delimiters: {
    thousands: ',',
    decimal: '.'
  },
  abbreviations: {
    thousand: '',
    million: '',
    billion: '',
    trillion: ''
  },
  ordinal: function (number) {
    return number === 1 ? '' : ''
  },
  currency: {
    symbol: '$'
  }
})

numeral.locale('es')

/* FUNCTIONS */
export const formatWithThousand = (num: number = 0) => {
  return numeral(num).format('$0,0.00')
}
