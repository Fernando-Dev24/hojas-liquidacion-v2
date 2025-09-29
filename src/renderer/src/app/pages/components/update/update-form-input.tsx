import { ObservationPageFormValues, Option } from '@renderer/interfaces'
import { UpdateFormDatePicker } from './update-form-datepicker'

interface Props {
  type: string
  name: keyof ObservationPageFormValues
  placeholder: string
  component: 'input' | 'select' | 'datepicker'
  options?: Option[]
  form: ObservationPageFormValues
  updateForm: (
    evt: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => void
}

export const UpdateFormInput = (props: Props) => {
  switch (props.component) {
    case 'input':
      return (
        <input
          type={props.type}
          id={props.name}
          name={props.name}
          placeholder={props.placeholder}
          value={props.form[props.name as string]}
          onChange={props.updateForm}
        />
      )
    case 'select':
      return (
        <select
          id={props.name}
          value={props.form[props.name as string]}
          name={props.name}
          onChange={props.updateForm}
        >
          {props.options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      )
    case 'datepicker':
      return <UpdateFormDatePicker />
    default:
      return <>Cannot render this input</>
  }
}
