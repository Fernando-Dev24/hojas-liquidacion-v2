import { formatDate } from '@renderer/helpers'
import { useAgendaStore } from '@renderer/store'

export const ConsolidadoAgendaTable = () => {
  const { orderedBookings } = useAgendaStore()

  return (
    <section className="consolidado-table mt-5">
      <table>
        <thead>
          <tr className="bg-secondary text-white">
            <th className="!w-[8%]">Cód. Infra</th>
            <th className="!w-[50%]">Nombre del Centro Escolar</th>
            <th>Fecha</th>
            <th>Departamento</th>
            <th>Agendado por</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {orderedBookings.length === 0 && (
            <tr>
              <td colSpan={5} className="text-center">
                No hay items para mostrar
              </td>
            </tr>
          )}
          {orderedBookings.map((item) => (
            <tr key={item.id}>
              <td className="!w-[8%]">{item.infra}</td>
              <td className="!w-[50%]">{item.school_name}</td>
              <td>{formatDate(item.visitDate)}</td>
              <td>{item.bookingDepartment}</td>
              <td>{item.created_by}</td>
              <td>Por visitar</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
