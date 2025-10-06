import { ObservationPage } from '@renderer/interfaces'

export const calculateTotalDebt = (observations: ObservationPage[]) => {
  let total = 0
  total = observations.reduce((acc, observation) => {
    let amount = Number(observation.amount)
    return acc + amount
  }, 0)

  return total
}
