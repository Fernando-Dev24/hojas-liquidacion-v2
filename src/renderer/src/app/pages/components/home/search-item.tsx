import { formatDate, formatWithThousand } from '@renderer/helpers'
import { ObservationPage } from '@renderer/interfaces'
import { FiChevronRight } from 'react-icons/fi'
import { useItem } from '../../home/hooks'

interface Props {
  item: ObservationPage
  customCloseModal: () => void
}

export const SearchItem = ({ item, customCloseModal }: Props) => {
  const { handleNavigate } = useItem(item)

  const goTo = () => {
    customCloseModal()
    handleNavigate()
  }

  return (
    <div
      className="flex justify-between items-center py-6 px-8 rounded-md bg-white border border-gray-300 shadow-md duration-150 hover:border-gray-400 cursor-pointer"
      onClick={goTo}
    >
      <div className="flex flex-col gap-y-1">
        <p className="text-[13px] text-gray-600">
          {item.infra} - {item.school_name}
        </p>
        <h5 className="text-2xl font-semibold">{item.department}</h5>
        <p className="text-[12px] text-gray-700">
          {formatWithThousand(item.amount)} | {item.category} | {item.createdBy} |{' '}
          {formatDate(item.date)}
        </p>
      </div>
      <span>
        <FiChevronRight size={25} className="text-secondary" />
      </span>
    </div>
  )
}
