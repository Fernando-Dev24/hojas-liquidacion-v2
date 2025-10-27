import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { FiPlus, FiSearch, FiTrash } from 'react-icons/fi'
import { useDirectory, useModals } from '@renderer/store'
import { onSearchDirectory } from '@renderer/app/actions'

interface SearchDirectoryForm {
  searchQuery: string
}

export const DirectorySearchbar = () => {
  const { setSearchResults } = useDirectory()
  const { toggleModal } = useModals()
  const { register, handleSubmit, reset } = useForm<SearchDirectoryForm>()

  const onSubmit = async ({ searchQuery }: SearchDirectoryForm) => {
    const toastId = toast.loading('Buscando...')
    const { ok, message, data } = await onSearchDirectory(searchQuery)
    if (!ok || !data) {
      setSearchResults([])
      return toast.update(toastId, {
        type: 'error',
        render: message,
        isLoading: false,
        autoClose: 2000,
        closeButton: true,
        closeOnClick: true
      })
    }

    setSearchResults(data)
    toast.dismiss(toastId)
  }

  const clearResults = () => {
    setSearchResults([])
    reset()
  }

  return (
    <nav className="mb-5 flex items-center justify-between">
      <form
        className="relative flex items-center gap-x-5 w-[35%]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <FiSearch size={20} className="absolute top-1/2 -translate-y-1/2 left-5 text-gray-500" />
        <input
          type="text"
          placeholder="Buscar por infraestructura"
          className="w-full flex items-center gap-x-3 py-3 px-5 ps-12 shadow-md rounded border border-gray-300 text-secondary/90 duration-150 outline-none hover:text-secondary hover:border-gray-400 focus:border-gray-400"
          {...register('searchQuery')}
        />

        <button type="submit" className="hidden" />
        <button
          type="button"
          className="p-3 rounded border border-gray-300 bg-white shadow text-secondary/80 cursor-pointer hover:text-secondary hover:border-gray-400"
          onClick={clearResults}
        >
          <FiTrash size={20} />
        </button>
      </form>

      <button
        className="flex items-center gap-x-3 py-3 px-5 shadow-md rounded border border-gray-300 text-secondary/90 duration-150 hover:text-secondary hover:border-gray-400 cursor-pointer"
        onClick={() => toggleModal('newDirectoryModal')}
      >
        <FiPlus size={20} />
        Nuevo
      </button>
    </nav>
  )
}
