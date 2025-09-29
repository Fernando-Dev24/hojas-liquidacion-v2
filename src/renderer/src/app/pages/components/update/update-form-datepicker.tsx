/* packages */
import DatePicker, { registerLocale, setDefaultLocale } from 'react-datepicker'
import { es } from 'date-fns/locale/es'
/* styles */
import 'react-datepicker/dist/react-datepicker.css'
import { useUpdateForm } from '@renderer/store'

/* Configure DatePicker to be in Spanish */
setDefaultLocale('es')
registerLocale('es', es)

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
