import { FiPlus, FiUsers, FiLogOut } from 'react-icons/fi'
import el_salvador_logo from '../../../../../../../public/el-salvador-logo.svg'
import { useLogin } from '@renderer/store'

export const Navbar = () => {
  const reset = useLogin((state) => state.reset)

  const onSignOut = () => {
    localStorage.removeItem('username')
    localStorage.removeItem('password')
    reset()
  }

  return (
    <nav className="relative flex justify-between items-center py-5 px-10 bg-secondary text-white">
      <article className="flex items-center">
        <figure>
          <img src={el_salvador_logo} alt="Logo El Salvador" width={75} />
        </figure>
        <figcaption className="inline-block ml-5 text-lg font-medium">
          Hojas de <br /> Liquidaciones
        </figcaption>
      </article>

      <article className="absolute -bottom-[25px] left-1/2 -translate-x-1/2">
        <button
          type="button"
          className="flex items-center py-3 px-8 bg-white text-secondary font-medium rounded-full border border-neutral-300 hover:border-secondary duration-150 shadow"
        >
          <FiPlus size={20} className="mr-3" />
          Nueva hoja de observaciones
        </button>
      </article>

      <article className="flex items-center gap-x-3">
        <button className="py-2 px-4 rounded-md border border-white hover:bg-white hover:text-secondary duration-150">
          <FiUsers size={20} />
        </button>

        <button
          className="py-2 px-4 rounded-md border border-white hover:bg-white hover:text-secondary duration-150"
          onClick={onSignOut}
        >
          <FiLogOut size={20} />
        </button>
      </article>
    </nav>
  )
}
