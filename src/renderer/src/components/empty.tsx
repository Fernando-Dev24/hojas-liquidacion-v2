import { FiPlus } from 'react-icons/fi'
import emptyIllustration from '../../../../public/empty-illustrator.svg'

interface Props {
  renderBtn: boolean
  fn?: () => void
}

export const Empty = ({ renderBtn, fn }: Props) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <figure className="w-[200px]">
        <img src={emptyIllustration} alt="Empty Illustration" className="w-full block mx-auto" />
      </figure>
      <p className="my-5 text-gray-600">No hay datos para mostrar</p>
      {renderBtn && (
        <button
          className="flex items-center p-3 rounded text-white bg-secondary hover:bg-secondary/90 duration-150 cursor-pointer"
          onClick={fn}
        >
          <FiPlus size={20} className="mr-3" />
          Agregar item
        </button>
      )}
    </div>
  )
}
