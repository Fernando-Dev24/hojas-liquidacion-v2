import { FiFile } from 'react-icons/fi'
import { Modal } from '@renderer/components'
import type { ModalProps } from '@renderer/interfaces'
import { ObservationPagePreview } from './observation-page'
import { exportObservationPDF } from './helpers/exportObservationPDF'

interface Props extends ModalProps {}

export const PDFWrapper = ({ id }: Props) => {
  const createPDF = () => {
    exportObservationPDF({ infra: 11434, id: 2377 })
  }

  return (
    <Modal
      id={id}
      className="fixed right-0 w-max h-full overflow-y-auto p-8 z-[800] bg-neutral-800 text-white bg-opacity-10 backdrop-filter backdrop-blur-xl"
    >
      <section className="mb-16">
        <h5 className="mb-5 text-3xl font-semibold">Vista Previa</h5>

        <nav>
          <button
            className="p-4 flex items-center rounded text-white bg-blue-600 hover:bg-blue-600/90 cursor-pointer duration-150"
            onClick={() => createPDF()}
          >
            <FiFile size={20} className="mr-3" />
            Generar PDF
          </button>
        </nav>
      </section>

      <article className="w-max">
        <ObservationPagePreview />
      </article>
    </Modal>
  )
}
