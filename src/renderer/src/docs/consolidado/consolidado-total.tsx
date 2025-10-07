import { formatWithThousand } from '@renderer/helpers'
import { useObservationsStore } from '@renderer/store'

export const ConsolidadoTotal = () => {
  const totalDebt = useObservationsStore((state) => state.totalDebt)

  return (
    <section className="my-5">
      <p className="w-max p-3 rounded-full bg-white border border-gray-300 shadow-md text-[14px] text-secondary">
        MONTO ADEUDADO: <span className="font-semibold">{formatWithThousand(totalDebt)}</span>
      </p>
    </section>
  )
}
