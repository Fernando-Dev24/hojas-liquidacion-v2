/* packages */
import DatePicker from 'react-datepicker'
/* styles */
import { useUpdateForm } from '@renderer/store'

export function UpdateFormDatePicker() {
  const date = useUpdateForm((state) => state.form.date)
  const updateDate = useUpdateForm((state) => state.updateDate)

  return (
    <>
      <DatePicker
        placeholderText="Selecciona la fecha"
        id="date"
        name="date"
        wrapperClassName="datepicker"
        dateFormat="dd/MM/yyyy"
        locale="es"
        showYearDropdown
        scrollableMonthYearDropdown
        selected={date}
        onChange={(date) => updateDate(date as Date)}
      />
    </>
  )
}
