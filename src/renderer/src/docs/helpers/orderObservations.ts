import { ObservationPage } from '@renderer/interfaces'
import { State } from '@renderer/store'

interface Params {
  filterBy: State['filterBy']
  orderBy: State['orderBy']
  observations: ObservationPage[]
}

export const orderObservationsByFilter = ({ filterBy, orderBy, observations }: Params) => {
  // TODO: Ordenar por filtro, orden
  console.log({ filterBy, orderBy, observations })
}
