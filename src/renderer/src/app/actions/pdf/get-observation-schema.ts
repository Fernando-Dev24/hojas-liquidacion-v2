import { toast } from 'react-toastify'

export const getObservationSchema = async () => {
  try {
    const response = await fetch('https://api.npoint.io/3aadfcf22b18e2b6bb54')
    const data = await response.json()
    return data?.document
  } catch (error) {
    console.log(error)
    toast.error('Error al obtener el esquema del PDF')
  }
}
