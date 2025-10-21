import { formatNowDate } from '@renderer/helpers'
import { Filter } from '@renderer/interfaces'
import html2canvas from 'html2canvas-pro'
import jsPDF, { jsPDFOptions } from 'jspdf'
import { toast } from 'react-toastify'

interface Props {
  filter: Filter
}

export const exportAgendaConsolidado = async ({ filter }: Props) => {
  const pageToExport = document.getElementById('page')
  if (!pageToExport) return
  const filename = `CONSOLIDADO AGENDA - ${filter} - ${formatNowDate()}`

  /* Objeto de opciones para configurar el PDF */
  const options = {
    margin: 0,
    filename,
    image: { type: 'jpg', quality: 1 },
    html2canvas: { scale: 4 }
  }

  const jsPdfOptions: jsPDFOptions = {
    compress: true,
    format: 'letter',
    orientation: 'p',
    unit: 'in'
  }

  try {
    const toastId = toast.loading('Generando PDF...')

    // exportamos el documento
    html2canvas(pageToExport, options.html2canvas).then((canvas) => {
      const imgData = canvas.toDataURL('image/jpeg', options.image.quality)
      const pdf = new jsPDF(jsPdfOptions)
      const imgProps = pdf.getImageProperties(imgData)
      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width
      pdf.addImage(imgData, options.image.type, options.margin, options.margin, pdfWidth, pdfHeight)
      pdf.save(options.filename)

      toast.dismiss(toastId)
    })
  } catch (error) {
    console.log(error)
  }
}
