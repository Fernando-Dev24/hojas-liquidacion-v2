import { onDeleteBooking } from '@renderer/app/actions'
import { formatDate, formatWithThousand, handleConfirmDelete } from '@renderer/helpers'
import { Booking } from '@renderer/interfaces'
import { useAgendaStore, useModals } from '@renderer/store'
import { useQueryClient } from '@tanstack/react-query'
import { FiCheckSquare, FiEdit, FiMoreVertical } from 'react-icons/fi'
import { MdOutlineSchool } from 'react-icons/md'
import { toast } from 'react-toastify'
import { Tooltip } from 'react-tooltip'

interface Props {
  item: Booking
}

export const AgendaSearchResultItem = ({ item }: Props) => {
  const { setBookingToEdit, setSearchResults } = useAgendaStore()
  const { toggleModal } = useModals()
  const queryClient = useQueryClient()

  const handleEdit = () => {
    setBookingToEdit(item)
    toggleModal('editBookingModal')
  }

  const handleDelete = async () => {
    const isConfirmed = await handleConfirmDelete()
    if (!isConfirmed) return

    const { ok, message } = await onDeleteBooking(item.id)
    if (!ok) return toast.error(message)
    await queryClient.invalidateQueries({ queryKey: ['agenda'] })
    setSearchResults([])
    toast.success(message)
    return
  }

  return (
    <>
      <div className="relative flex items-center gap-x-5 p-5 rounded border border-gray-300 bg-gray-100/50 hover:border-gray-400 duration-150">
        <span className="p-2 rounded shadow-md border border-gray-400 bg-white">
          <MdOutlineSchool size={20} />
        </span>
        <div>
          <h5 className="text-lg text-secondary font-medium ">{item.school_name}</h5>
          <p className="text-sm text-gray-600">
            {item.rubro} | {formatWithThousand(item.total)} | {formatDate(item.visitDate)}
          </p>
          <p className="text-xs text-gray-600 capitalize">{item.created_by}</p>
        </div>

        <button
          className="absolute top-1/2 -translate-y-1/2 right-5 p-1 text-secondary/80 hover:text-secondary cursor-pointer"
          data-tooltip-id={`search-result-${item.id}`}
        >
          <FiMoreVertical size={20} />
        </button>
      </div>

      <Tooltip
        clickable
        openOnClick
        closeEvents={{ click: true }}
        id={`search-result-${item.id}`}
        place="bottom"
        border="1px solid #d1d5dc"
        className="!p-5 !border !border-gray-300 !rounded-lg !shadow-lg !bg-white !z-40"
      >
        <div className="flex flex-col gap-y-5">
          <button className="user-option-btn" onClick={handleEdit}>
            <FiEdit size={20} className="mr-3" />
            Editar
          </button>

          <button
            className="user-option-btn !text-white !border-red-600 !bg-red-600 hover:!bg-red-600/90"
            onClick={handleDelete}
          >
            <FiCheckSquare size={20} className="mr-3" />
            Eliminar
          </button>
        </div>
      </Tooltip>
    </>
  )
}
