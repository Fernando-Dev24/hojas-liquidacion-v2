import { formatWithThousand } from '@renderer/helpers'
import { useObservationsStore } from '@renderer/store'
import { useEffect, useState } from 'react'
import { calculateTotalDebt } from '../helpers/calculate-total-debt'

export const ConsolidadoTotal = () => {
  const observations = useObservationsStore((state) => state.observations)
  const [totalDebt, setTotalDebt] = useState(0)

  useEffect(() => {
    const total = calculateTotalDebt(observations)
    setTotalDebt(total)
  }, [setTotalDebt])

  return (
    <section className="my-5">
      <p className="w-max p-3 rounded-full bg-white border border-gray-300 shadow-md text-[14px] text-secondary">
        MONTO ADEUDADO: <span className="font-semibold">{formatWithThousand(totalDebt)}</span>
      </p>
    </section>
  )
}
