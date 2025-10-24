import { useForm } from 'react-hook-form'
import { FiPlus } from 'react-icons/fi'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import { Modal } from '@renderer/components'
import { useModals } from '@renderer/store'
import { onCreateUser } from '@renderer/app/actions'
import { userDataInputs } from '../../admin/types/form-types'
import { ModalProps, UserForm } from '@renderer/interfaces'

interface Props extends ModalProps {}

export const AdminNewUserModal = ({ id }: Props) => {
  const { register, handleSubmit, reset } = useForm<UserForm>()
  const { toggleModal } = useModals()
  const queryClient = useQueryClient()

  const onSubmit = async (values: UserForm) => {
    const { ok, message } = await onCreateUser(values)

    if (!ok) {
      toast.error(message)
      return
    }

    await queryClient.invalidateQueries({ queryKey: ['users'] })
    toast.success(message)
    customCloseFn()
  }

  const customCloseFn = () => {
    reset()
    toggleModal(id)
  }

  return (
    <Modal id={id} className="w-[450px] max-h-[650px] modal" customCloseFn={customCloseFn}>
      <h3 className="mb-8 text-xl text-secondary font-medium">Crear nuevo Usuario</h3>

      <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        {userDataInputs.map((formItem) => (
          <div key={formItem.name} className="mb-5">
            <label htmlFor={formItem.name} className="inline-block mb-2 text-gray-600 text-[14px]">
              {formItem.placeholder}
            </label>
            {formItem.component === 'input' && (
              <input
                type={formItem.type}
                id={formItem.name}
                placeholder={formItem.placeholder}
                className="modal-input"
                {...register(formItem.name)}
              />
            )}

            {formItem.component === 'select' && (
              <select id={formItem.name} {...register(formItem.name)}>
                {formItem.options?.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            )}
          </div>
        ))}

        <button
          type="submit"
          className="w-full flex justify-center items-center gap-x-3 p-3 rounded-sm text-white bg-secondary duration-150 hover:bg-secondary/90 cursor-pointer"
        >
          <FiPlus size={20} />
          Crear usuario
        </button>
      </form>
    </Modal>
  )
}
