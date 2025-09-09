import { FiCalendar, FiFile, FiSearch } from 'react-icons/fi'

export const Landing = () => {
  return (
    <section className="container mt-30">
      <h3 className="text-7xl font-medium text-center text-neutral-700">
        Buen día, <span className="font-bold text-secondary">Fernando</span>
      </h3>

      <nav className="my-10 flex justify-center items-center gap-x-5">
        <button className="flex items-center py-3 px-5 shadow rounded bg-secondary text-white duration-150 hover:opacity-90">
          <FiSearch size={20} className="mr-3" />
          Buscar
        </button>

        <button className="flex items-center py-3 px-5 shadow rounded bg-secondary text-white duration-150 hover:opacity-90">
          <FiCalendar size={20} className="mr-3" />
          Agenda
        </button>

        <button className="flex items-center py-3 px-5 shadow rounded bg-secondary text-white duration-150 hover:opacity-90">
          <FiFile size={20} className="mr-3" />
          Consolidado
        </button>
      </nav>
    </section>
  )
}
