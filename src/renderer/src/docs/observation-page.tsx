import { DocHeader } from './doc-header'
import { ObservationsReport, ObservationGeneralData, ObservationFooter } from './observations'
import type { ObservationPageFormValues, ObservationPDFSchema } from '@renderer/interfaces'
import { useUpdateForm, useObservationPDFShema } from '@renderer/store'

export interface PDFProps {
  pdfSchema: ObservationPDFSchema | null
  form: ObservationPageFormValues
}

export const ObservationPagePreview = () => {
  const { pdfSchema } = useObservationPDFShema((state) => state)
  const { form } = useUpdateForm((state) => state)

  if (!pdfSchema) {
    return (
      <section className="page" id="page">
        <p className="text-center text-[14px]">
          No se ha generado el esquema de la hoja de observación
        </p>
      </section>
    )
  }

  return (
    <section>
      <article className="page" id="page">
        {/* HEADER */}
        <DocHeader>
          <h5 className="text-[14px] font-semibold">
            MINISTERIO DE EDUCACIÓN, CIENCIA Y TECNOLOGÍA
          </h5>
          <p className="text-[12px]">
            UNIDAD DE LIQUIDACIÓN <br />
            CUADRO DE OBSERVACIONES EN LIQUIDACIÓN
          </p>
        </DocHeader>

        {/* GENERAL DATA */}
        <ObservationGeneralData form={form} pdfSchema={pdfSchema} />

        {/* REPORT */}
        <ObservationsReport form={form} pdfSchema={pdfSchema} />

        {/* FOOTER */}
        <ObservationFooter form={form} pdfSchema={pdfSchema} />
      </article>
    </section>
  )
}
