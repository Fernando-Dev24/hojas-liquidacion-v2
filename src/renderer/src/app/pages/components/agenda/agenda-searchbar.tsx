import { searchBookingBy } from '@renderer/app/actions'
import { useAgendaStore } from '@renderer/store'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FiCalendar, FiHome, FiTrash } from 'react-icons/fi'
import { toast } from 'react-toastify'
import { AgendaSearchResultItem } from './agenda-search-result-item'
import clsx from 'clsx'

interface SearchForm {
  searchQuery: string
}

export const AgendaSearchbar = () => {
  const { register, handleSubmit, reset } = useForm<SearchForm>()
  const { searchResults, setSearchResults, filterBy } = useAgendaStore()
  const [searchByDate, setSearchByDate] = useState(false)

  const handleSearchBy = () => {
    handleReset()
    setSearchByDate(!searchByDate)
  }

  const handleReset = () => {
    setSearchResults([])
    reset()
  }

  const onSubmit = async (values: SearchForm) => {
    const toastId = toast.loading('Buscando...')

    const { ok, message, data } = await searchBookingBy({
      searchQuery: values.searchQuery,
      searchByDate,
      filterBy
    })

    if (!ok) {
      setSearchResults(data)
      toast.update(toastId, {
        type: 'error',
        render: message,
        isLoading: false,
        autoClose: 2000,
        closeButton: true,
        closeOnClick: true
      })
      return
    }

    setSearchResults(data)
    toast.dismiss(toastId)
  }

  return (
    <div className="relative mb-14">
      <form className="w-full" autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center gap-x-5">
          <div className="relative w-full">
            <input
              type={searchByDate ? 'date' : 'text'}
              className="modal-input"
              placeholder={`Buscar por ${searchByDate ? 'fecha' : 'infraestructura'}`}
              {...register('searchQuery')}
            />

            <button
              type="button"
              className={clsx(
                'absolute top-1/2 -translate-y-1/2 text-gray-600 hover:text-secondary cursor-pointer',
                {
                  'right-12': searchByDate,
                  'right-10': !searchByDate
                }
              )}
              onClick={handleReset}
            >
              <FiTrash size={15} />
            </button>
          </div>
          <button
            type="button"
            className="p-3 text-secondary/70 rounded border border-gray-300 shadow bg-gray-100 duration-150 hover:border-secondary hover:text-secondary cursor-pointer"
            onClick={handleSearchBy}
          >
            {!searchByDate ? <FiHome size={20} /> : <FiCalendar size={20} />}
          </button>
        </div>
        <button type="submit" className="hidden" />
      </form>

      {searchResults.length > 0 && (
        <div className="absolute -bottom-[410px] left-0 w-[91.5%] max-w-[91.5%] h-[400px] max-h-[400px] bg-white rounded-lg p-10 border border-gray-300 shadow-lg z-20">
          {searchResults.map((item) => (
            <AgendaSearchResultItem key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  )
}
