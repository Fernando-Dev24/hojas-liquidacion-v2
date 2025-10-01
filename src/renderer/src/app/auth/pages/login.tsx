import { IoEyeOutline } from 'react-icons/io5'
import { formInputs } from '../form-types'
import logo_mined from '../../../../../../public/mined-logo.png'
import { useLogin as useLoginHook } from '../hooks'
import { onLogin } from '../../actions'
import { FormValues } from '../hooks/use-login'
import { useLogin } from '@renderer/store'

const Login = () => {
  const { register, handleSubmit, toggleSeePassword, seePassword } = useLoginHook()
  const setUser = useLogin((state) => state.setUser)

  const onSubmit = async (values: FormValues) => {
    const user = await onLogin(values)
    if (!user) return
    setUser(user)
  }

  return (
    <>
      <div className="bg-secondary relative">
        <div className="flex justify-between h-screen" id="bg-login">
          <div className="hidden lg:block lg:w-2/3 z-10">
            <div className="flex items-start h-full px-20 bg-opacity-40">
              <div className="mt-48">
                <p className="text-sm text-white/70 uppercase">
                  Departamental de Educación San Salvador
                </p>
                <h2 className="text-4xl font-bold text-white">
                  Unidad de liquidación y Presupuesto
                </h2>

                <p className="w-3/4 pt-5 text-white/80">
                  Esta app te lleva al corazón de la gestión escolar en San Salvador, con
                  herramientas para liquidar materiales escolares de forma rápida y precisa. 💡
                  Explora una agenda interactiva que organiza tu día a día y un directorio escolar
                  completo que conecta todo al instante. 📅📚 ¡Inicia sesión y lleva tu trabajo
                  educativo al siguiente nivel con un solo clic! 🚀
                </p>
              </div>
            </div>
          </div>

          <div className="w-1/3 flex flex-col justify-center px-10 bg-white z-10">
            <div>
              <figure className="mb-10">
                <img
                  src={logo_mined}
                  alt="Logo Mined"
                  className="block mx-auto"
                  width={200}
                  height={200}
                />
              </figure>

              <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
                {formInputs.map(({ label, placeholder, type }) => (
                  <div className="mb-5" key={type}>
                    <label
                      htmlFor={type}
                      className="block mb-2 font-medium text-gray-900 dark:text-gray-400"
                    >
                      {label}
                    </label>

                    <div className="relative">
                      <input
                        type={type === 'password' ? (seePassword ? 'text' : 'password') : type}
                        id={type}
                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-secondary focus:border-secondary block w-full p-2.5 outline-none duration-150"
                        placeholder={placeholder}
                        {...register(type, { required: true })}
                      />

                      {type === 'password' && (
                        <button
                          type="button"
                          className="absolute top-1/2 right-2.5 -translate-y-1/2 cursor-pointer"
                          onClick={toggleSeePassword}
                        >
                          <IoEyeOutline size={20} className="text-neutral-600" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}

                <button className="w-full mt-5 py-2 px-4 rounded text-white bg-secondary transition-colors duration-150 hover:opacity-95">
                  Iniciar sesión
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
