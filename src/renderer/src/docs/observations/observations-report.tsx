import { generateUUID } from '@renderer/helpers'
import { Observation } from '@renderer/interfaces'
import { PDFProps } from '../observation-page'

export const ObservationsReport = ({ pdfSchema, form }: PDFProps) => {
  if (!pdfSchema) {
    return <></>
  }

  const body = pdfSchema.body

  return (
    <section className="mt-3 h-[515px] max-h-[515px] border-b border-secondary overflow-y-hidden">
      <table className="w-full overflow-y-hidden border border-secondary">
        <thead>
          <tr>
            <th colSpan={4} className="py-2 text-[14px] bg-secondary text-white">
              {body.observations_report.title.label}
            </th>
          </tr>

          <tr className="report-tr">
            <th>{body.observations_report.col1.label}</th>
            <th>{body.observations_report.col2.label}</th>
            <th className="w-[77%]">{body.observations_report.col3.label}</th>
            <th className="w-[5%]">{body.observations_report.col4.label}</th>
          </tr>
        </thead>

        <tbody>
          {form.observations.length < 1 ? (
            <tr className="report-tr">
              <td colSpan={4} className="text-center">
                No hay observaciones
              </td>
            </tr>
          ) : (
            form.observations.map((item, index) => (
              <tr className="report-tr" key={item.id}>
                <td className="text-center">{index + 1}</td>
                <td className="text-center">{item.observation_place}</td>
                <td className="w-[77%]">{item.observation_content}</td>
                <td className="w-[5%] text-center">{item.observation_state}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </section>
  )
}
