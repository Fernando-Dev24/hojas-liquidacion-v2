import { FiPlus } from 'react-icons/fi'
import { useQuery } from '@tanstack/react-query'
import { Empty } from '@renderer/components'
import { AdminUserItem } from './admin-user-item'
import { useModals } from '@renderer/store'
import { getUsers } from '@renderer/app/actions'
import { AdminUsersSkeleton } from '..'

export const AdminUsersPanel = () => {
  const { toggleModal } = useModals()

  const {
    data: users,
    isLoading,
    error
  } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers
  })

  if (isLoading) return <AdminUsersSkeleton />
  if (error) return <div>Error al obtener los usuarios</div>

  return (
    <>
      <div className="h-[625px] max-h-[800px] overflow-y-auto">
        <div className="flex justify-between items-baseline mb-10">
          <h5 className="text-4xl font-medium">Usuarios</h5>
          <button
            className="flex items-center py-3 px-4 rounded-md bg-white shadow border border-gray-300 duration-150 hover:border-gray-400 cursor-pointer"
            onClick={() => toggleModal('createUserModal')}
          >
            <FiPlus size={20} className="mr-3" />
            Agregar usuario
          </button>
        </div>

        {(!users || users.length < 1) && <Empty renderBtn={false} />}

        {users?.map((user) => (
          <AdminUserItem key={user.id} user={user} />
        ))}
      </div>
    </>
  )
}
