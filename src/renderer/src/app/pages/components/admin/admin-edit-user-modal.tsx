import { Modal } from '@renderer/components'
import { ModalProps, UserForm } from '@renderer/interfaces'
import { userDataInputs } from '../../admin/types/form-types'
import { useForm } from 'react-hook-form'
import { FiEdit } from 'react-icons/fi'
import { toast } from 'react-toastify'
import { useAdminStore, useLogin, useModals } from '@renderer/store'
import { useQueryClient } from '@tanstack/react-query'
import { onEditUser, onSignOut } from '@renderer/app/actions'

interface Props extends ModalProps {}

export const AdminEditUserModal = ({ id }: Props) => {
  const { userToEdit, resetState } = useAdminStore()
  const { user: currentUser, reset: resetUser } = useLogin()
  const { register, handleSubmit, reset } = useForm<UserForm>({
    values: {
      username: userToEdit?.username || '',
      password: userToEdit?.password || '',
      roles: userToEdit?.roles[0] ?? ''
    }
  })
  const { toggleModal } = useModals()
  const queryClient = useQueryClient()

  const onSubmit = async (values: UserForm) => {
    const { ok, message } = await onEditUser({
      id: userToEdit?.id || null,
      values
    })

    if (!ok) {
      toast.error(message)
      return
    }

    if (currentUser) {
      if (currentUser.id === userToEdit?.id) {
        resetState()
        customCloseFn()
        onSignOut(resetUser)
        toast.success('Vuelve a iniciar sesión')
        return
      }
    }

    await queryClient.invalidateQueries({ queryKey: ['users'] })
    toast.success(message)
    resetState()
    customCloseFn()
  }

  const customCloseFn = () => {
    reset()
    resetState()
    toggleModal(id)
  }

  return (
    <Modal id={id} className="w-[450px] max-h-[650px] modal" customCloseFn={customCloseFn}>
      <h3 className="mb-8 text-xl text-secondary font-medium">Editar usuario</h3>

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
                className="w-full p-3 px-5 rounded bg-gray-200/30 border border-gray-300 outline-none duration-150 hover:border-gray-400 focus:border-gray-400"
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
          <FiEdit size={20} />
          Editar usuario
        </button>
      </form>
    </Modal>
  )
}
