import { formatWithThousand } from '@renderer/helpers'
import { useObservationsStore } from '@renderer/store'

export const ConsolidadoTable = () => {
  const observations = useObservationsStore((state) => state.orderedObservations)

  return (
    <section className="consolidado-table">
      <table>
        <thead>
          <tr className="bg-secondary text-white">
            <th className="!w-[8%]">Cód. Infra</th>
            <th className="!w-[60%]">Nombre del Centro Escolar</th>
            <th className="!w-[40%]">Rubro</th>
            <th>Monto</th>
            <th className="!w-[10%]">Estado</th>
          </tr>
        </thead>
        <tbody>
          {observations.length === 0 && (
            <tr>
              <td colSpan={5} className="text-center">
                No hay observaciones
              </td>
            </tr>
          )}
          {observations.map((item) => (
            <tr key={item.id}>
              <td className="!w-[8%]">{item.infra}</td>
              <td className="!w-[60%]">{item.school_name}</td>
              <td className="!w-[40%]">{item.department}</td>
              <td>{formatWithThousand(item.amount)}</td>
              <td className="!w-[10%]">Pendiente</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
