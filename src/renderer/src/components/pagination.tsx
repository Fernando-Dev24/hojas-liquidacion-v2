import { FiChevronLeft, FiChevronRight, FiHome } from 'react-icons/fi'

interface Props {
  totalPages: number
  currentPage: number
}

export const Pagination = ({ totalPages, currentPage }: Props) => {
  return (
    <div className="flex justify-between items-center">
      <span>
        Pág {currentPage} de {totalPages}
      </span>
      <div className="flex items-center gap-x-5">
        <button className="btn-pagination" disabled={currentPage === 1}>
          <FiChevronLeft size={20} />
        </button>

        <button className="btn-pagination">
          <FiHome size={20} />
        </button>

        <button className="btn-pagination" disabled={currentPage === totalPages}>
          <FiChevronRight size={20} />
        </button>
      </div>
    </div>
  )
}
