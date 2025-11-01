import { SchoolDirectoryForm } from '@renderer/interfaces'
import { Control, useController } from 'react-hook-form'
import { IMaskInput } from 'react-imask'

interface Props {
  name: keyof SchoolDirectoryForm
  control: Control<SchoolDirectoryForm>
  defaultValue: string
  mask: string
  placeholder: string
}

export const MaskInputController = ({
  control,
  mask,
  placeholder,
  name,
  defaultValue = ''
}: Props) => {
  const {
    field: { ref, onChange, value }
  } = useController({
    name,
    control,
    defaultValue
  })

  return (
    <IMaskInput
      id={name}
      mask={mask}
      value={value || ''}
      onAccept={(value) => onChange(value)}
      inputRef={ref}
      placeholder={placeholder}
      className="w-full py-3 px-5 rounded-lg border border-gray-300 outline-none bg-white duration-150 hover:border-gray-400 focus:border-gray-400"
      unmask={true}
    />
  )
}
