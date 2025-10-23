import { onDeleteDirectory } from '@renderer/app/actions'
import { formatDate, handleConfirmDelete } from '@renderer/helpers'
import { SchoolDirectoryEntry } from '@renderer/interfaces'
import { useModals } from '@renderer/store'
import { useDirectory } from '@renderer/store/directory'
import { useQueryClient } from '@tanstack/react-query'
import { FiEdit, FiMoreVertical, FiTrash } from 'react-icons/fi'
import { toast } from 'react-toastify'
import { Tooltip } from 'react-tooltip'

interface Props {
  item: SchoolDirectoryEntry
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>
}

export const DirectoryTableItem = ({ item, setSearchQuery }: Props) => {
  const { toggleModal } = useModals()
  const { searchResults, setSearchResults, setDirectoryEdit } = useDirectory()
  const query = useQueryClient()

  const handleEdit = () => {
    setDirectoryEdit(item)
    toggleModal('editDirectoryModal')
  }

  const handleDelete = async () => {
    const isConfirmed = await handleConfirmDelete()
    if (!isConfirmed) return

    const { ok, message } = await onDeleteDirectory(item.id)
    if (!ok) return toast.error(message)

    // Validar si se ha eliminado de los resultados
    if (searchResults.length >= 1) {
      setSearchResults([])
      setSearchQuery('')
    }

    await query.invalidateQueries({ queryKey: ['directories'] })
    toast.success(message)
    return
  }

  return (
    <>
      <tr className="bg-white text-secondary border-b border-gray-300 text-base">
        <td className="px-6 py-4 w-[10%]">{item.infra}</td>
        <td className="px-6 py-4 font-semibold text-secondary whitespace-nowrap">{item.name}</td>
        <td className="px-6 py-4 capitalize">{item.municipio}</td>
        <td className="px-6 py-4">{item.sector}</td>
        <td className="px-6 py-4">{formatDate(item.updatedAt)}</td>
        <td className="px-6 py-4">
          <button data-tooltip-id={`directory-options-${item.id}`} className="cursor-pointer">
            <FiMoreVertical size={20} />
          </button>

          <Tooltip
            clickable
            openOnClick
            closeEvents={{ click: true }}
            id={`directory-options-${item.id}`}
            place="bottom"
            border="1px solid #99a1af"
            className="!p-5 !border !border-gray-400/80 !rounded-lg !shadow-lg !bg-white !z-40"
          >
            <div className="flex flex-col gap-y-5">
              <button className="user-option-btn" onClick={handleEdit}>
                <FiEdit size={20} className="mr-3" />
                Editar
              </button>

              <button
                className="user-option-btn !text-white !border-red-600 !bg-red-600 hover:!bg-red-600/90"
                onClick={handleDelete}
              >
                <FiTrash size={20} className="mr-3" />
                Eliminar
              </button>
            </div>
          </Tooltip>
        </td>
      </tr>
    </>
  )
}
