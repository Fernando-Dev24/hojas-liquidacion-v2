import { FiArrowDown, FiArrowUp, FiFile } from 'react-icons/fi'
import { Modal } from '@renderer/components'
import type { ModalProps } from '@renderer/interfaces'
import { ConsolidadoPage } from './consolidado-page'
import { useModals } from '@renderer/store'
import { exportConsolidadoFile } from './helpers/export-consolidado'

interface Props extends ModalProps {}

export const ConsolidadoWrapper = ({ id }: Props) => {
  const { filterBy, orderBy, setOrder } = useModals((state) => state)

  const createPDF = () => {
    exportConsolidadoFile({ filter: filterBy })
  }

  return (
    <Modal
      id={id}
      className="fixed right-0 w-max h-full overflow-y-auto p-8 z-[800] bg-neutral-800 text-white bg-opacity-10 backdrop-filter backdrop-blur-xl"
    >
      <section className="mb-16">
        <h5 className="mb-5 text-3xl font-semibold">Vista Previa</h5>

        <nav className="flex items-center gap-x-5">
          <button
            className="p-4 flex items-center rounded text-white bg-blue-600 hover:bg-blue-600/90 cursor-pointer duration-150"
            onClick={() => createPDF()}
          >
            <FiFile size={20} className="mr-3" />
            Generar PDF
          </button>

          <button
            className="p-4 flex items-center rounded text-white bg-secondary hover:bg-secondary/90 cursor-pointer duration-150"
            onClick={setOrder}
          >
            {orderBy === 'ASC' ? (
              <FiArrowDown size={20} className="mr-3" />
            ) : (
              <FiArrowUp size={20} className="mr-3" />
            )}
            Ordenar {orderBy === 'ASC' ? 'Descendente' : 'Ascendente'}
          </button>
        </nav>
      </section>

      <article className="w-max">
        <ConsolidadoPage />
      </article>
    </Modal>
  )
}
