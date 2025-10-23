import { Modal } from '@renderer/components'
import { INFRAS } from '@renderer/data/infras/infras'
import { directoryFormValues, ModalProps, SchoolDirectoryForm } from '@renderer/interfaces'
import { useForm } from 'react-hook-form'
import { FiEdit } from 'react-icons/fi'
import { RiResetRightFill } from 'react-icons/ri'
import { NITInputController } from './nit-input-controller'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { useDirectory } from '@renderer/store/directory'
import { onUpdateDirectory } from '@renderer/app/actions'
import { useModals } from '@renderer/store'

interface Props extends ModalProps {}

export const EditDirectoryModal = ({ id }: Props) => {
  const { directoryToEdit, setDirectoryEdit } = useDirectory()
  const { toggleModal } = useModals()
  const { control, register, handleSubmit, watch, setValue, reset } = useForm<SchoolDirectoryForm>({
    values: {
      infra: directoryToEdit?.infra || '',
      municipio: directoryToEdit?.municipio || '',
      name: directoryToEdit?.name || '',
      nit: directoryToEdit?.nit || '',
      sector: directoryToEdit?.sector || ''
    }
  })
  const query = useQueryClient()

  /* FUNCTIONS */
  const onChangeInfra = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = evt
    if (target.id === 'infra') {
      const [data] = INFRAS.filter((infra) => infra.code === Number(target.value))
      if (data) {
        setValue('name', data.name)
      } else {
        setValue('name', '')
      }
    }
  }

  const onSubmit = async (values: SchoolDirectoryForm) => {
    const { ok, message } = await onUpdateDirectory({ values, id: directoryToEdit?.id || null })

    if (!ok) {
      return toast.error(message)
    }

    await query.invalidateQueries({ queryKey: ['directories'] })
    reset()
    setDirectoryEdit(null)
    toggleModal(id)
    toast.success(message)
    return
  }

  watch(['name'])

  return (
    <Modal id={id} className="w-[75%] modal relative !bg-gray-200">
      <div>
        <h2 className="text-2xl text-secondary font-semibold">Editar directorio</h2>
        <p className="mb-10 text-gray-700">Rellena los campos correctamente</p>
      </div>

      <form className="grid grid-cols-2 gap-5" autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        {directoryFormValues.map((item) => (
          <div key={item.name} className={item.wrapperClassName}>
            <label htmlFor={item.name} className="inline-block mb-1 text-sm text-gray-600">
              {item.label}
            </label>
            {item.component === 'input' && (
              <input
                type="text"
                placeholder={item.label}
                autoFocus={item.focus}
                className="w-full py-3 px-5 rounded-lg border border-gray-300 outline-none bg-white duration-150 hover:border-gray-400 focus:border-gray-400"
                id={item.name}
                {...register(item.name, { onChange: onChangeInfra })}
              />
            )}
            {item.component === 'select' && (
              <select
                id={item.name}
                className="w-full py-3 px-5 rounded-lg border border-gray-300 outline-none bg-white duration-150"
                {...register(item.name)}
              >
                {item.options?.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            )}
            {item.component === 'controller' && (
              <NITInputController control={control} name={item.name} defaultValue="" />
            )}
          </div>
        ))}

        {/* BUTTONS */}
        <div className="absolute bottom-0 left-0 w-full p-5 flex items-center justify-end gap-x-5 drop-shadow-xl rounded-t-3xl drop-shadow-secondary bg-white">
          <button
            type="button"
            className="cursor-pointer text-secondary/80 duration-150 hover:animate-spin"
            onClick={() => reset()}
          >
            <RiResetRightFill size={20} />
          </button>
          <button
            type="submit"
            className="flex items-center gap-x-3 p-2 rounded border border-gray-300 shadow-md cursor-pointer bg-secondary text-white font-medium duration-150 hover:bg-secondary/90"
          >
            Editar
            <FiEdit size={20} />
          </button>
        </div>
      </form>
    </Modal>
  )
}
