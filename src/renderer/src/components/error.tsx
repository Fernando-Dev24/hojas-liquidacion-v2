import { FiRefreshCcw } from 'react-icons/fi'
import image_error from '../../../../public/error.svg'

interface Props {
  errorLabel: string
}

export const Error = ({ errorLabel }: Props) => {
  const reset = () => {
    window.location.reload()
  }

  return (
    <section className="w-full h-screen grid place-items-center bg-gray-300/40">
      <article className="flex flex-col items-center justify-center">
        <figure className="w-[350px]">
          <img src={image_error} alt="404 image" className="w-full" />
        </figure>
        <figcaption className="my-5">
          <p className="text-center text-xl text-secondary font-medium">
            Error al obtener {errorLabel} de la base de datos
          </p>
          <p className="text-md text-gray-600">
            Recarga la página, si el error persistente, ponte en contacto con soporte
          </p>
        </figcaption>

        <button
          className="flex items-center gap-x-3 p-4 rounded-lg border border-gray-300 bg-white text-secondary font-medium shadow duration-150 hover:border-gray-400 cursor-pointer"
          onClick={reset}
        >
          <FiRefreshCcw />
          Recargar página
        </button>
      </article>
    </section>
  )
}
