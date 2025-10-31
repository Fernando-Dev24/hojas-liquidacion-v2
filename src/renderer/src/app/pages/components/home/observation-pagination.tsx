import { PaginationActions } from '@renderer/store'
import { FiChevronLeft, FiChevronRight, FiHome } from 'react-icons/fi'

interface Props {
  totalPages: number
  currentPage: number
  triggerCurrentPage: (action: PaginationActions) => void
}

export const ObservationPagination = ({ totalPages, currentPage, triggerCurrentPage }: Props) => {
  return (
    <nav className="flex items-center gap-x-5">
      <button
        className="pagination-observation-btn"
        disabled={currentPage === 1}
        onClick={() => triggerCurrentPage('prev')}
      >
        <FiChevronLeft size={20} />
      </button>

      <button className="pagination-observation-btn" onClick={() => triggerCurrentPage('reset')}>
        <FiHome size={20} />
      </button>

      <button
        className="pagination-observation-btn"
        disabled={currentPage === totalPages}
        onClick={() => triggerCurrentPage('next')}
      >
        <FiChevronRight size={20} />
      </button>
    </nav>
  )
}
