import { Modal } from '@renderer/components'
import { BookingForm, bookingFormSchema, ModalProps } from '@renderer/interfaces'
import { FiPlus } from 'react-icons/fi'
import DatePicker from 'react-datepicker'
import { useForm } from 'react-hook-form'
import { INFRAS } from '@renderer/data/infras/infras'
import { onCreateBooking } from '@renderer/app/actions'
import { useLogin, useModals } from '@renderer/store'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'

interface Props extends ModalProps {}

export const AgendaNewItem = ({ id }: Props) => {
  const { user } = useLogin()
  const { toggleModal } = useModals()
  const { register, handleSubmit, setValue, getValues, watch, reset } = useForm<BookingForm>({
    defaultValues: {
      total: 0,
      visitDate: new Date()
    }
  })
  const queryClient = useQueryClient()

  const handleDate = (date: Date | null) => {
    if (!date) return setValue('visitDate', new Date())
    setValue('visitDate', date)
  }

  const onChangeInfra = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = evt
    if (target.id === 'infra') {
      const [data] = INFRAS.filter((infra) => infra.code === Number(target.value))
      if (data) {
        setValue('school_name', data.name)
      }
    }
  }

  const onSubmit = async (values: BookingForm) => {
    const { ok, message } = await onCreateBooking({
      values,
      username: user?.username || null
    })

    if (!ok) return toast.error(message)
    await queryClient.invalidateQueries({ queryKey: ['agenda'] })
    toast.success(message)
    onCloseModal()
    return
  }

  const onCloseModal = () => {
    reset()
    toggleModal(id)
  }

  watch(['visitDate', 'school_name'])

  return (
    <Modal id={id} className="modal modal-booking" customCloseFn={onCloseModal}>
      <div className="py-5 px-5">
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <h2 className="mb-8 text-secondary text-2xl font-semibold">Crear nuevo registro</h2>

          <div className="grid grid-cols-3 gap-5 mb-5">
            {bookingFormSchema.map((item) => (
              <div key={item.id} className={item.wrapperClassName}>
                <label htmlFor={item.id} className="inline-block mb-2 text-gray-600 text-sm">
                  {item.label}
                </label>
                {item.component === 'input' && (
                  <input
                    type={item.type}
                    id={item.id}
                    placeholder={item.label}
                    className="modal-input"
                    {...register(item.id, {
                      onChange: onChangeInfra
                    })}
                  />
                )}
                {item.component === 'select' && (
                  <select id={item.id} className="modal-input" {...register(item.id)}>
                    {item.options?.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                )}

                {item.component === 'textarea' && (
                  <textarea
                    id={item.id}
                    placeholder={item.label}
                    className="resize-none field-sizing-content modal-input max-h-[200px]"
                    {...register(item.id)}
                  />
                )}

                {item.component === 'datepicker' && (
                  <DatePicker
                    placeholderText="Selecciona la fecha"
                    id={item.id}
                    className="modal-input"
                    showTimeSelect
                    showYearDropdown
                    scrollableMonthYearDropdown
                    wrapperClassName="datepicker"
                    dateFormat="Pp"
                    timeFormat="h:mm aa"
                    timeCaption="Hora"
                    locale="es"
                    selected={getValues('visitDate')}
                    onChange={(date) => handleDate(date)}
                  />
                )}
              </div>
            ))}
          </div>

          <button type="submit" className="w-full flex justify-center items-center btn-confirm">
            <FiPlus size={20} className="mr-3" />
            Crear
          </button>
        </form>
      </div>
    </Modal>
  )
}
