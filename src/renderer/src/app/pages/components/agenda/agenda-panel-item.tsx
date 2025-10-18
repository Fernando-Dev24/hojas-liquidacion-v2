import { onDeleteBooking } from '@renderer/app/actions'
import { formatBookingDate, formatWithThousand, handleConfirmDelete } from '@renderer/helpers'
import { Booking } from '@renderer/interfaces'
import { useAgendaStore, useModals } from '@renderer/store'
import { useQueryClient } from '@tanstack/react-query'
import { FiCheckSquare, FiEdit, FiMoreVertical } from 'react-icons/fi'
import { LuSchool } from 'react-icons/lu'
import { toast } from 'react-toastify'
import { Tooltip } from 'react-tooltip'

interface Props {
  booking: Booking
}

export const AgendaPanelItem = ({ booking }: Props) => {
  const { setBookingToEdit } = useAgendaStore()
  const { toggleModal } = useModals()
  const queryClient = useQueryClient()

  const handleEdit = () => {
    setBookingToEdit(booking)
    toggleModal('editBookingModal')
  }

  const handleDelete = async () => {
    const isConfirmed = await handleConfirmDelete()
    if (!isConfirmed) return

    const { ok, message } = await onDeleteBooking(booking.id)
    if (!ok) return toast.error(message)
    await queryClient.invalidateQueries({ queryKey: ['agenda'] })
    toast.success(message)
    return
  }

  return (
    <>
      <article className="relative mb-8 grid grid-cols-[10%_minmax(75%,_1fr)] gap-x-10 p-10 rounded-xl border border-gray-300 bg-gray-100 shadow">
        {/* FECHA Y HORA */}
        <div className="flex flex-col justify-start gap-y-5 ">
          <div className="text-right">
            <p className="text-gray-500 text-lg">Fecha</p>
            <p className="text-xl font-medium text-secondary capitalize">
              {formatBookingDate(booking.visitDate, 'd LLL')}
            </p>
          </div>

          <div className="text-right">
            <p className="text-gray-500 text-lg">Hora</p>
            <p className="text-xl font-medium text-secondary">
              {formatBookingDate(booking.visitDate, 'h:m a')}
            </p>
          </div>
        </div>

        {/* CE, INFRA, DESC, TOTAL, RUBRO */}
        <div>
          <div>
            <span className="inline-flex items-center gap-x-3 text-sm text-gray-500">
              <LuSchool size={20} />
              {booking.infra} | {booking.bookingDepartment}
            </span>
            <p className="flex items-center gap-x-3 text-xl font-medium text-secondary">
              {booking.school_name}
            </p>
            <p className="mb-5 text-sm text-gray-700 capitalize">
              {booking?.rubro} | {formatWithThousand(booking?.total)} | Por visitar |{' '}
              {booking.created_by}
            </p>
            <p className="w-[90%] text-sm text-gray-700">
              {booking?.description ||
                `Cita para ${booking.school_name} con número de infraestructura ${booking.infra} creada por ${booking.created_by} para fecha ${formatBookingDate(
                  booking.visitDate,
                  'dd/MM/yyyy'
                )}`}
            </p>
          </div>
        </div>

        {/* BUTTON */}
        <button
          className="absolute top-10 right-10 p-1 text-gray-600 duration-150 cursor-pointer hover:text-secondary"
          data-tooltip-id={`booking-tooltip-${booking.id}`}
        >
          <FiMoreVertical size={20} />
        </button>
      </article>

      <Tooltip
        clickable
        openOnClick
        closeEvents={{ click: true }}
        id={`booking-tooltip-${booking.id}`}
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
