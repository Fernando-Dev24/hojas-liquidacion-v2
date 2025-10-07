import { ModalProps, ObservationPage } from '@renderer/interfaces'
import { Modal } from '../../../../components/modal'
import { FiCalendar, FiHome } from 'react-icons/fi'
import { Empty } from '../../../../components/empty'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useModals, useObservationsStore } from '@renderer/store'
import { onSearch } from '@renderer/app/actions'
import { toast } from 'react-toastify'
import { SearchItem } from './search-item'

interface Props extends ModalProps {}

interface SearchValues {
  searchInfra: string
  searchDate: string
}

export const SearchObservationModal = ({ id }: Props) => {
  const { register, reset, handleSubmit } = useForm<SearchValues>({
    defaultValues: {
      searchInfra: '',
      searchDate: ''
    }
  })
  const { searchResults, setSearchResults } = useObservationsStore((state) => state)
  const toggleModal = useModals((state) => state.toggleModal)
  const [searchByDate, setSearchByDate] = useState(false)

  const onSubmit = async (values: SearchValues) => {
    const { searchDate, searchInfra } = values

    const toastId = toast.loading('Buscando...')

    const { ok, data } = await onSearch({
      searchByDate,
      searchDate,
      searchInfra
    })

    if (!ok) {
      toast.update(toastId, {
        render: 'Error al buscar las observaciones',
        type: 'error',
        isLoading: false,
        autoClose: 2000,
        closeOnClick: true
      })
      return
    }

    setSearchResults(data as ObservationPage[])
    toast.dismiss()
  }

  const handleSearchBy = () => {
    reset()
    setSearchByDate(!searchByDate)
  }

  const customCloseModal = () => {
    setSearchResults([])
    reset()
    toggleModal(id)
  }

  return (
    <>
      <Modal
        id={id}
        customCloseFn={customCloseModal}
        className="w-3/4 h-[600px] m-h-[800px] modal !bg-gray-200"
      >
        <section className="p-2">
          <form
            className="w-full flex items-center gap-x-5"
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
          >
            {searchByDate && (
              <input
                type="date"
                className="search-modal-input"
                placeholder="Buscar por infraestructura"
                {...register('searchDate')}
              />
            )}
            {!searchByDate && (
              <input
                type="text"
                className="search-modal-input"
                placeholder="Buscar por infraestructura"
                {...register('searchInfra')}
              />
            )}
            <button
              type="button"
              className="p-3 rounded bg-white outline-none shadow-md cursor-pointer duration-150 border border-gray-300 hover:border-gray-400 text-secondary"
              onClick={handleSearchBy}
            >
              {!searchByDate ? <FiHome size={20} /> : <FiCalendar size={20} />}
            </button>
            <button type="submit" className="hidden" />
          </form>

          {/* DATA */}
          <article className="mt-14">
            {searchResults.length < 1 && <Empty renderBtn={false} />}

            {searchResults.length >= 1 &&
              searchResults.map((item) => (
                <SearchItem key={item.id} item={item} customCloseModal={customCloseModal} />
              ))}
          </article>
        </section>
      </Modal>
    </>
  )
}
