import { FiPlus } from 'react-icons/fi'

export const Navbar = () => {
  return (
    <nav>
      <article>
        <figure>
          <img src="" alt="Logo El Salvador" />
        </figure>
        <figcaption>Hojas de Liquidaciones</figcaption>
      </article>

      <article>
        <button type="button">
          <FiPlus size={20} />
          Nueva hoja
        </button>
      </article>

      <article>{/* BOTONES DE NAVEGACION */}</article>
    </nav>
  )
}
