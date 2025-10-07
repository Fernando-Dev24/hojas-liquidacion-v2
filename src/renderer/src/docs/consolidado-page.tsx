import { DocHeader } from './doc-header'
import { ConsolidadoTotal } from './consolidado/consolidado-total'
import { ConsolidadoTable } from './consolidado/consolidado-table'
import { useObservationsStore } from '@renderer/store'
import { useEffect } from 'react'
import { orderObservationsByFilter } from './helpers/orderObservations'

export const ConsolidadoPage = () => {
  const { observations, filterBy, orderBy, setConsolidadoData } = useObservationsStore(
    (state) => state
  )

  useEffect(() => {
    const { filteredObs, total } = orderObservationsByFilter({
      filterBy,
      orderBy,
      observations
    })

    setConsolidadoData(filteredObs, total)
  }, [orderBy])

  return (
    <section>
      <article className="page" id="page">
        <DocHeader>
          <p className="text-[10px]">
            DEPARTAMENTAL DE EDUCACIÓN - SAN SALVADOR - UNIDAD DE PRESUPUESTO Y LIQUIDACIONES
          </p>
          <h5 className="text-[14px] font-semibold">
            CONSOLIDADO DE INSTITUCIONES OBSERVADAS QUE <br /> AUN NO HAN LIQUIDADO
          </h5>
        </DocHeader>

        <ConsolidadoTotal />
        <ConsolidadoTable />
      </article>
    </section>
  )
}
