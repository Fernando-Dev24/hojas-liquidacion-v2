import { FiEdit, FiMoreVertical, FiTrash, FiUser } from 'react-icons/fi'
import { Tooltip } from 'react-tooltip'
import { User } from '@renderer/interfaces'
import { useQueryClient } from '@tanstack/react-query'
import { handleConfirmDelete } from '@renderer/helpers'
import { onDeleteUser, onSignOut } from '@renderer/app/actions'
import { toast } from 'react-toastify'
import { useLogin } from '@renderer/store'

interface Props {
  user: User
}

export const AdminUserItem = ({ user }: Props) => {
  const queryClient = useQueryClient()
  const { user: currentUser, reset } = useLogin()

  const onDelete = async () => {
    const isConfirmed = await handleConfirmDelete()
    if (!isConfirmed) return

    const { ok, message } = await onDeleteUser(user.id)
    if (!ok) return toast.error(message)

    if (currentUser) {
      if (currentUser.id === user.id) {
        onSignOut(reset)
        toast.success('Vuelve a iniciar sesión')
        return
      }
    }

    queryClient.invalidateQueries({ queryKey: ['users'] })
    toast.success(message)
    return
  }

  return (
    <>
      <div className="relative mb-10 p-5 rounded-lg shadow border border-gray-300 bg-gray-50">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <span className="inline-block mr-5 p-2 rounded border border-gray-300 text-secondary bg-gray-200/50">
              <FiUser size={20} />
            </span>
            <div>
              <p className="capitalize text-secondary font-medium">{user.username}</p>
              <p className="capitalize text-gray-600 text-[14px]">
                {user.roles.join(',').split('_')[0]}
              </p>
            </div>
          </div>

          <button
            className="absolute top-1/2 right-14 -translate-y-1/2 p-1 text-gray-600 duration-150 hover:text-secondary cursor-pointer outline-none"
            data-tooltip-id={`user-options-${user.id}`}
          >
            <FiMoreVertical size={20} />
          </button>
        </div>
      </div>

      <Tooltip
        clickable
        openOnClick
        closeEvents={{ click: true }}
        id={`user-options-${user.id}`}
        place="bottom"
        border="1px solid #d1d5dc"
        className="!p-5 !border !border-gray-300 !rounded-lg !shadow-lg !bg-white !z-40"
      >
        <div className="flex flex-col gap-y-5">
          <button className="user-option-btn">
            <FiEdit size={20} className="mr-3" />
            Editar
          </button>

          <button
            className="user-option-btn !text-white !border-red-600 !bg-red-600 hover:!bg-red-600/90"
            onClick={onDelete}
          >
            <FiTrash size={20} className="mr-3" />
            Eliminar
          </button>
        </div>
      </Tooltip>
    </>
  )
}
