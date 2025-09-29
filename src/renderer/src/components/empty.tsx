import { FiPlus } from 'react-icons/fi'
import { TbMoodEmpty } from 'react-icons/tb'

interface Props {
  fn: () => void
}

export const Empty = ({ fn }: Props) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <h2 className="text-3xl text-secondary font-medium">No hay nada para mostrar aquí</h2>
      <TbMoodEmpty size={60} className="my-5 text-secondary" />
      <button
        className="flex items-center p-3 rounded text-white bg-secondary hover:bg-secondary/90 duration-150 cursor-pointer"
        onClick={fn}
      >
        <FiPlus size={20} className="mr-3" />
        Agregar item
      </button>
    </div>
  )
}
