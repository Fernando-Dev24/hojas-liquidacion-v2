import { FiBookmark, FiCalendar, FiFile, FiSearch } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { useLogin, useModals, useObservationsStore } from '@renderer/store'
import { handleFilterConsolidado } from '@renderer/helpers'

export const Landing = () => {
  const user = useLogin((state) => state.user)
  const setFilterBy = useObservationsStore((state) => state.setFilterBy)
  const toggleModal = useModals((state) => state.toggleModal)
  const navigate = useNavigate()

  const renderConsolidado = async () => {
    const resp = await handleFilterConsolidado()
    setFilterBy(resp)
    toggleModal('consolidadoModal')
  }

  const goToAgenda = () => {
    navigate(`/app/agenda`)
  }

  const showSearchModal = () => toggleModal('searchObservationModal')

  return (
    <section className="container mt-30">
      <h3 className="text-7xl font-medium text-center text-neutral-700">
        Buen día,{' '}
        <span className="font-bold capitalize text-secondary">{user?.username.split(' ')[0]}</span>
      </h3>

      <nav className="my-10 flex justify-center items-center gap-x-5">
        <button
          className="flex items-center py-3 px-5 shadow rounded bg-secondary text-white duration-150 hover:opacity-90"
          onClick={showSearchModal}
        >
          <FiSearch size={20} className="mr-3" />
          Buscar
        </button>

        <button
          className="flex items-center py-3 px-5 shadow rounded bg-secondary text-white duration-150 hover:opacity-90"
          onClick={goToAgenda}
        >
          <FiCalendar size={20} className="mr-3" />
          Agenda
        </button>

        <button
          className="flex items-center py-3 px-5 shadow rounded bg-secondary text-white duration-150 hover:opacity-90"
          onClick={() => navigate('/app/directory')}
        >
          <FiBookmark size={20} className="mr-3" />
          Directorio
        </button>

        <button
          className="flex items-center py-3 px-5 shadow rounded bg-secondary text-white duration-150 hover:opacity-90"
          onClick={renderConsolidado}
        >
          <FiFile size={20} className="mr-3" />
          Consolidado
        </button>
      </nav>
    </section>
  )
}
