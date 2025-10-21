import { FiArrowLeft } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

export const DirectoryNavbar = () => {
  const navigate = useNavigate()

  return (
    <nav className="my-12">
      <button
        className="flex items-center p-3 rounded-md shadow-md border border-gray-300 text-gray-600 bg-white hover:border-gray-400 duration-150 cursor-pointer"
        onClick={() => navigate('/app/home')}
      >
        <FiArrowLeft size={20} className="mr-3" />
        Regresar
      </button>
    </nav>
  )
}
