import { FiArrowLeft } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

export const AdminNavbar = () => {
  const navigate = useNavigate()

  const handleExit = () => {
    navigate('/app/home')
  }

  return (
    <nav className="pb-10 flex justify-between items-center">
      <button
        className="flex items-center p-3 rounded-md shadow-md border border-gray-300 text-gray-600 bg-white hover:border-gray-400 duration-150 cursor-pointer"
        onClick={handleExit}
      >
        <FiArrowLeft size={20} className="mr-3" />
        Regresar
      </button>
    </nav>
  )
}
