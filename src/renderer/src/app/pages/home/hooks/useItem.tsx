import { ObservationPage } from '@renderer/interfaces'
import { useUpdateForm } from '@renderer/store'
import { useNavigate } from 'react-router-dom'

export const useItem = (data: ObservationPage) => {
  const setForm = useUpdateForm((state) => state.setForm)
  const navigate = useNavigate()

  const handleNavigate = () => {
    setForm(data)
    navigate(`/app/update/${data.id}`, { replace: true })
  }

  return {
    handleNavigate
  }
}
