import numbro from 'numbro'

/* FUNCTIONS */
export const formatWithThousand = (num: number = 0) => {
  return numbro(num).formatCurrency({ thousandSeparated: true, mantissa: 2 })
}
