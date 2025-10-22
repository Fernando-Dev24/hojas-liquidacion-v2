import { SchoolDirectoryForm } from '@renderer/interfaces'
import { Control, useController } from 'react-hook-form'
import { IMaskInput } from 'react-imask'

interface Props {
  name: keyof SchoolDirectoryForm
  control: Control<SchoolDirectoryForm>
  defaultValue: string
}

export const NITInputController = ({ control, name, defaultValue = '' }: Props) => {
  const {
    field: { ref, onChange, value }
  } = useController({
    name,
    control,
    defaultValue,
    rules: {
      required: true
    }
  })

  return (
    <IMaskInput
      id={name}
      mask={'0000-000000-000-0'}
      value={value || ''}
      onAccept={(value) => onChange(value)}
      inputRef={ref}
      placeholder="XXXX-XXXXXX-XXX-X"
      className="w-full py-3 px-5 rounded-lg border border-gray-300 outline-none bg-white duration-150 hover:border-gray-400 focus:border-gray-400"
      unmask={true}
    />
  )
}
