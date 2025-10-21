import { PaginationActions } from '@renderer/store'
import { FiChevronLeft, FiChevronRight, FiHome } from 'react-icons/fi'

interface Props {
  totalPages: number
  currentPage: number
  textColor?: string
  btnClassName?: string
  triggerCurrentPage: (action: PaginationActions) => void
}

export const Pagination = ({
  totalPages,
  currentPage,
  textColor,
  btnClassName,
  triggerCurrentPage
}: Props) => {
  return (
    <div className="flex justify-between items-center">
      <span className={textColor}>
        Pág {currentPage} de {totalPages}
      </span>
      <div className="flex items-center gap-x-5">
        <button
          className={btnClassName ?? 'btn-pagination'}
          disabled={currentPage === 1}
          onClick={() => triggerCurrentPage('prev')}
        >
          <FiChevronLeft size={20} />
        </button>

        <button
          className={btnClassName ?? 'btn-pagination'}
          onClick={() => triggerCurrentPage('reset')}
        >
          <FiHome size={20} />
        </button>

        <button
          className={btnClassName ?? 'btn-pagination'}
          disabled={currentPage === totalPages}
          onClick={() => triggerCurrentPage('next')}
        >
          <FiChevronRight size={20} />
        </button>
      </div>
    </div>
  )
}
