import { handleSaveAndExit } from '@renderer/helpers'
import { useUpdateForm } from '@renderer/store'
import { useModals } from '@renderer/store/modal-store'
import { FiArrowLeft, FiFile, FiTrash } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

const button_class =
  'flex items-center p-3 rounded-md border border-neutral-200 text-slate-500 duration-150 hover:bg-secondary hover:text-white shadow'

export const UpdateNavbar = () => {
  const toggleModal = useModals((state) => state.toggleModal)
  const { form, reset } = useUpdateForm((state) => state)
  const navigate = useNavigate()

  const handleExit = () => {
    handleSaveAndExit({
      form,
      reset,
      navigate,
      action: form.id ? 'update' : 'create'
    })
  }

  const viewPDF = () => {
    toggleModal('pdfModal')
  }

  return (
    <nav className="py-10 flex justify-between items-center">
      <button className={button_class} onClick={handleExit}>
        <FiArrowLeft size={20} className="mr-3" />
        Regresar
      </button>

      {form.id && (
        <article className="flex items-center gap-x-5">
          <button
            className={`${button_class} !text-red-600 !border-red-600 hover:!bg-red-600 hover:!text-white`}
          >
            <FiTrash size={20} className="mr-3" />
            Eliminar
          </button>

          <button className={button_class} onClick={viewPDF}>
            <FiFile size={20} className="mr-3" />
            Ver PDF
          </button>
        </article>
      )}
    </nav>
  )
}
