import { User } from '@renderer/interfaces'
import { FiPlus, FiUser } from 'react-icons/fi'

const users: User[] = [
  {
    id: '1',
    username: 'Fernando Ortiz',
    password: 'XXXX',
    roles: ['admin'],
    userId: '1'
  },
  {
    id: '2',
    username: 'Andrea',
    password: 'XXXX',
    roles: ['digitador'],
    userId: '2'
  }
]

export const AdminUsersPanel = () => {
  return (
    <div>
      <div className="flex justify-between items-baseline mb-10">
        <h5 className="text-4xl font-medium">Usuarios</h5>
        <button className="flex items-center py-3 px-4 rounded-md bg-white shadow border border-gray-300 duration-150 hover:border-gray-400 cursor-pointer">
          <FiPlus size={20} className="mr-3" />
          Agregar usuario
        </button>
      </div>

      {users.map((item) => (
        <div key={item.id} className="mb-8 p-5 rounded-lg shadow border border-gray-300 bg-gray-50">
          <div className="flex items-center">
            <span className="inline-block mr-5 p-2 rounded border border-gray-300 text-secondary bg-gray-200/50">
              <FiUser size={20} />
            </span>
            <div>
              <p className="text-secondary font-medium">{item.username}</p>
              <p className="capitalize text-gray-600 text-[14px]">{item.roles.join(',')}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
