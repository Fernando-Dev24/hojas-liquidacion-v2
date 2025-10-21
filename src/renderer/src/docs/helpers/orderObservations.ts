import { ObservationPage } from '@renderer/interfaces'
import { ObservationState } from '@renderer/store'

interface Params {
  filterBy: ObservationState['filterBy']
  orderBy: ObservationState['orderBy']
  observations: ObservationPage[]
}

export const orderObservationsByFilter = ({ filterBy, orderBy, observations }: Params) => {
  // 1. Obtener primero las observaciones segun el filtro
  const filteredObs = observations.filter((item) => item.category === filterBy)

  // 2. Calcular el total de las observaciones filtradas
  const total = filteredObs.reduce((acc, item) => {
    let amount = Number(item.amount)
    return acc + amount
  }, 0)

  // 3. Ordenar las observaciones filtradas en orden ASC o DESC segun su numero de infra
  filteredObs.sort((a, b) => {
    return orderBy === 'ASC' ? Number(a.infra) - Number(b.infra) : Number(b.infra) - Number(a.infra)
  })

  return {
    filteredObs,
    total
  }
}
