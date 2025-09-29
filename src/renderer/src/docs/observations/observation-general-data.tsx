import { formatDate } from '@renderer/helpers'
import { PDFProps } from '../observation-page'

export const ObservationGeneralData = ({ pdfSchema, form }: PDFProps) => {
  if (!pdfSchema) {
    return <></>
  }
  const header = pdfSchema.header

  return (
    <section className="grid grid-cols-3 gap-5 items-center py-5">
      <div className="grid-item w-max py-1 px-2 rounded text-white bg-secondary">
        <p>
          {header.number.label}: {form[header.number.value]}
        </p>
      </div>
      <div className="grid-item">
        <p>
          {header.code.label}: <span> {form[header.code.value]}</span>
        </p>
      </div>
      <div className="grid-item">
        <p>
          {header.date.label}: <span>{formatDate(form[header.date.value])}</span>
        </p>
      </div>
      <div className="grid-item col-span-full">
        <p>
          {header.school_name.label}: <span>{form[header.school_name.value]}</span>
        </p>
      </div>
      <div className="grid-item col-span-full">
        <p>
          {header.department.label}: <span>{form[header.department.value]}</span>
        </p>
      </div>
    </section>
  )
}
