import { updateFormInputs } from '../../update/update-form-values'

export const UpdateForm = () => {
  return (
    <article className="my-14">
      <form className="w-full" onSubmit={(e) => e.preventDefault()}>
        <article className="grid grid-cols-3 gap-5">
          {updateFormInputs.map((data) => (
            <div key={data.name} className="update-form">
              <label htmlFor={data.name}>{data.label}</label>

              {data.component === 'input' ? (
                <input type={data.type} placeholder={data.placeholder} id={data.name} />
              ) : data.component === 'select' ? (
                <select id={data.name}>
                  {data.options?.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : (
                /* DATEPICKER */
                <></>
              )}
            </div>
          ))}
        </article>
      </form>
    </article>
  )
}
