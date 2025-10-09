import { FiEdit, FiMoreVertical, FiTrash, FiUser } from 'react-icons/fi'
import { Tooltip } from 'react-tooltip'
import { User } from '@renderer/interfaces'

interface Props {
  user: User
}

export const AdminUserItem = ({ user }: Props) => {
  const clickTest = () => {
    console.log('click test')
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
            data-tooltip-id="user-options"
          >
            <FiMoreVertical size={20} />
          </button>
        </div>
      </div>

      <Tooltip
        clickable
        openOnClick
        closeEvents={{ click: true }}
        id="user-options"
        place="bottom"
        border="1px solid #d1d5dc"
        className="!p-5 !border !border-gray-300 !rounded-lg !shadow-lg !bg-white !z-40"
      >
        <div className="flex flex-col gap-y-5">
          <button className="user-option-btn" onClick={clickTest}>
            <FiEdit size={20} className="mr-3" />
            Editar
          </button>

          <button
            className="user-option-btn !text-white !border-red-600 !bg-red-600 hover:!bg-red-600/90"
            onClick={clickTest}
          >
            <FiTrash size={20} className="mr-3" />
            Eliminar
          </button>
        </div>
      </Tooltip>
    </>
  )
}
