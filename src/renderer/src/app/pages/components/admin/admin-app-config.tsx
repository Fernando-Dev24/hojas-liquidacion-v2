import { FiCheck, FiSettings } from 'react-icons/fi'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getAdminConfig, updateAdminConfig } from '@renderer/app/actions'
import { configOptions } from '../../admin/types/config-type'
import type { AdminConfig } from '@renderer/interfaces/admin'

export const AdminAppConfigPanel = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['admin-config'],
    queryFn: getAdminConfig
  })

  const { register, handleSubmit, reset } = useForm<AdminConfig>({
    values: {
      financiero: data?.financiero || 'no-limit',
      paquetes: data?.paquetes || 'no-limit'
    }
  })
  const queryClient = useQueryClient()

  const onSubmit = async (values: AdminConfig) => {
    const { ok, message } = await updateAdminConfig(values)
    if (!ok) {
      toast.error(message)
      return
    }

    // REVALIDAR LA QUERY
    queryClient.invalidateQueries({ queryKey: ['admin-config'] })
    toast.success(message)
  }

  if (isLoading) return <p>Cargando...</p>
  if (error) return <p>Error al obtener la configuración</p>

  return (
    <>
      <div className="relative admin-panel-wrapper">
        {/* HEADER */}
        <div className="flex items-center gap-x-8 mb-14">
          <span className="p-3 rounded border border-gray-200 text-secondary bg-gray-300/40">
            <FiSettings size={20} />
          </span>
          <div>
            <h2 className="text-3xl font-medium">Configuración</h2>
            <p className="text-gray-600">
              Edita los limites para agendar segun la categoria, entre otras cosas
            </p>
          </div>
        </div>

        {/* SETTINGS */}
        <form
          autoComplete="off"
          className="flex flex-col gap-y-12"
          onSubmit={handleSubmit(onSubmit)}
        >
          {configOptions.map((item) => (
            <div key={item.id}>
              <div className="config-option">
                <div className="flex items-center text-[20px] gap-x-3">
                  <span className="p-3 rounded border border-gray-200 text-secondary bg-gray-300/40">
                    {item.icon}
                  </span>
                  {item.label}
                </div>
                <select id={item.id} className="!w-[200px] admin-select" {...register(item.id)}>
                  {item.options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}

          <div className="absolute bottom-12 right-12 flex items-center gap-x-5">
            <button
              type="button"
              className="btn-confirm !border !border-gray-300 !text-secondary !bg-transparent hover:!border-gray-400"
              onClick={() => reset()}
            >
              Cancelar
            </button>
            <button type="submit" className="btn-confirm">
              <FiCheck size={20} className="mr-3" />
              Aplicar
            </button>
          </div>
        </form>
      </div>
    </>
  )
}
