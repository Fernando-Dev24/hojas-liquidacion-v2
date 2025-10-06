import { FiChevronLeft, FiChevronRight, FiHome } from 'react-icons/fi'

interface Props {
  totalPages: number
  currentPage: number
  triggerCurrentPage: (action: 'next' | 'prev' | 'reset') => void
}

export const Pagination = ({ totalPages, currentPage, triggerCurrentPage }: Props) => {
  return (
    <div className="flex justify-between items-center">
      <span>
        Pág {currentPage} de {totalPages}
      </span>
      <div className="flex items-center gap-x-5">
        <button
          className="btn-pagination"
          disabled={currentPage === 1}
          onClick={() => triggerCurrentPage('prev')}
        >
          <FiChevronLeft size={20} />
        </button>

        <button className="btn-pagination" onClick={() => triggerCurrentPage('reset')}>
          <FiHome size={20} />
        </button>

        <button
          className="btn-pagination"
          disabled={currentPage === totalPages}
          onClick={() => triggerCurrentPage('next')}
        >
          <FiChevronRight size={20} />
        </button>
      </div>
    </div>
  )
}
