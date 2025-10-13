import { onDelete, onSave } from '@renderer/app/actions'
import { handleConfirmDelete, handleSaveAndExit } from '@renderer/helpers'
import { useLogin, useUpdateForm } from '@renderer/store'
import { useModals } from '@renderer/store/modal-store'
import { FiArrowLeft, FiFile, FiTrash } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export const UpdateNavbar = () => {
  const toggleModal = useModals((state) => state.toggleModal)
  const { form, reset } = useUpdateForm((state) => state)
  const user = useLogin((state) => state.user)
  const navigate = useNavigate()

  const handleExit = async () => {
    const isConfirmed = await handleSaveAndExit()

    // Si quiere salir sin guardar, solamente un reset del form y navigate
    if (!isConfirmed) {
      reset()
      navigate('/app/home', { replace: true })
      return
    }

    // Si quiere guardar
    const { ok, message } = await onSave({
      data: form,
      username: user?.username || '',
      action: form.id ? 'update' : 'create'
    })

    if (!ok) {
      toast.error(message)
      return
    }

    reset()
    toast.success(message)
    navigate('/app/home', { replace: true })
    return
  }

  const handleDelete = async () => {
    const isConfirmed = await handleConfirmDelete()
    if (!isConfirmed) return

    const { ok, message } = await onDelete(form.id)
    if (!ok) {
      toast.error(message)
      return
    }

    navigate('/app/home', { replace: true })
    toast.success(message)
  }

  const viewPDF = () => {
    toggleModal('pdfModal')
  }

  return (
    <nav className="py-10 flex justify-between items-center">
      <button className="button_class" onClick={handleExit}>
        <FiArrowLeft size={20} className="mr-3" />
        Regresar
      </button>

      {form.id && (
        <article className="flex items-center gap-x-5">
          <button
            className={`button_class !text-red-600 !border-red-600 hover:!bg-red-600 hover:!text-white`}
            onClick={handleDelete}
          >
            <FiTrash size={20} className="mr-3" />
            Eliminar
          </button>

          <button className="button_class" onClick={viewPDF}>
            <FiFile size={20} className="mr-3" />
            Ver PDF
          </button>
        </article>
      )}
    </nav>
  )
}
