import { formatWithThousand } from '@renderer/helpers'
import { PDFProps } from '../observation-page'

export const ObservationFooter = ({ pdfSchema, form }: PDFProps) => {
  if (!pdfSchema) {
    return <></>
  }

  const body = pdfSchema.body
  const footer = pdfSchema.footer

  return (
    <section className="absolute bottom-[120px] left-1/2 -translate-x-1/2 w-[93%] bg-white">
      <article className="mb-3">
        <p className="mb-1 text-[14px] font-medium">
          {body.amount.label}: {formatWithThousand(form[body.amount.value])}
        </p>
        <p className="font-medium">
          {body.note.label}: {body.note.value}
        </p>
      </article>

      <article className="grid grid-cols-2 items-center gap-x-10">
        <div>
          <div className="text-center">
            <p className="signature !mb-3">
              F: <span className="line"></span>
            </p>
            <p className="signature-label">{form[footer.signs.liquidador.value]}</p>
            <small className="signature-rol">{footer.signs.liquidador.person}</small>
          </div>
        </div>

        <div>
          <div className="text-center">
            <p className="signature">
              {footer.signs.deliveredTo.label}: <span className="line" />
            </p>
          </div>

          <div className="text-center">
            <p className="signature !mb-3">
              F: <span className="line" />
            </p>
            <p className="signature-label">{footer.signs.deliveredTo.fields}</p>
            <small className="signature-rol">{footer.signs.deliveredTo.person}</small>
          </div>
        </div>
      </article>
    </section>
  )
}
