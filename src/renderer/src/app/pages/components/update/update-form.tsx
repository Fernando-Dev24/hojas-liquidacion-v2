import { useUpdateForm } from '@renderer/store'
import { updateFormInputs } from '../../update/update-form-values'
import { UpdateFormInput } from './update-form-input'
import { Empty } from '../../../../components/empty'
import { Item } from './item'

export const UpdateForm = () => {
  const { form, updateForm, insertItem } = useUpdateForm((state) => state)

  return (
    <article className="my-5">
      <form className="w-full" onSubmit={(e) => e.preventDefault()}>
        <article className="grid grid-cols-3 gap-5">
          {updateFormInputs.map((data) => (
            <div key={data.name} className={`update-form ${data?.wrapperClassName}`}>
              <label htmlFor={data.name}>{data.label}</label>
              <UpdateFormInput
                component={data.component}
                form={form}
                name={data.name}
                placeholder={data.placeholder}
                type={data.type}
                options={data.options}
                updateForm={updateForm}
              />
            </div>
          ))}
        </article>

        <hr className="w-full block my-10 border border-gray-300" />

        <article className="my-10">
          {form.observations.length < 1 ? (
            <Empty renderBtn={true} fn={insertItem} />
          ) : (
            <>
              <div className="py-10">
                <h2 className="text-secondary text-2xl font-medium">Observaciones</h2>
                <p className="text-gray-600">
                  Escribe las observaciones de dicha escuela, estas observaciones salen reflejadas
                  en el archivo PDF.
                </p>
              </div>

              {/* ITEMS */}
              {form.observations.map((item) => (
                <Item key={item.id} {...item} />
              ))}
            </>
          )}
        </article>
      </form>
    </article>
  )
}
