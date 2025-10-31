import { useObservationsStore } from '@renderer/store'

export const FilterToggle = () => {
  const { filterByCompleted, setFilterByCompleted } = useObservationsStore()

  const handleToggleFilter = () => {
    setFilterByCompleted(!filterByCompleted)
  }

  return (
    <div className="flex items-center py-3 px-5 shadow rounded bg-secondary text-white duration-150">
      <label className="inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          value=""
          className="sr-only peer"
          checked={filterByCompleted}
          onChange={handleToggleFilter}
        />
        <div className="relative w-11 h-6 bg-gray-400 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-400 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
        <span className="ms-3 text-sm font-medium text-white">
          {filterByCompleted ? 'Completadas' : 'Pendientes'}
        </span>
      </label>
    </div>
  )
}
