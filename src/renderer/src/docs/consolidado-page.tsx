import { DocHeader } from './doc-header'
import { ConsolidadoTotal } from './consolidado/consolidado-total'
import { ConsolidadoTable } from './consolidado/consolidado-table'

export const ConsolidadoPage = () => {
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
