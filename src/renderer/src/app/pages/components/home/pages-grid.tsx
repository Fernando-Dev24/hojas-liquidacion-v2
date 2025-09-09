import { ObservationPage } from '@renderer/interfaces'
import { GridItem } from './grid-item'

const data: ObservationPage[] = [
  {
    id: '0457553686',
    infra: 86393,
    school_name: 'CENTRO ESCOLAR LOTIFICACIÓN SANTA CARLOTA N° 1, CANTÓN JOYA GALANA',
    department: 'SALARIOS DE PERSONAL CONTRATADO EN EL CENTRO EDUCATIVO 2024 - BÁSICA',
    amount: 2262,
    createdBy: 'Johan Guevara',
    date: new Date(2025, 8, 9),
    category: 'PAQUETES',
    created: 2262.63,
    filledBy: 'Ing. Fernando Ortiz',
    observations: [],
    reportId: '1'
  },
  {
    id: '0457553686',
    infra: 11723,
    school_name: 'COMPLEJO EDUCATIVO REPÚBLICA DE COREA',
    department: 'SALARIO MEDIA 2024',
    amount: 20530.88,
    createdBy: 'Lorena Colocho',
    date: new Date(2025, 8, 9),
    category: 'FINANCIERO',
    created: 20250809,
    filledBy: 'Ing. Lorena Colocho',
    observations: [],
    reportId: '1'
  },
  {
    id: '0457553686',
    infra: 11723,
    school_name: 'COMPLEJO EDUCATIVO REPÚBLICA DE COREA',
    department: 'FUNCIONAMIENTO 2024',
    amount: 3000,
    createdBy: 'Lorena Colocho',
    date: new Date(2025, 8, 9),
    category: 'FINANCIERO',
    created: 20250809,
    filledBy: 'Ing. Lorena Colocho',
    observations: [],
    reportId: '1'
  }
]

export const PagesGrid = () => {
  return (
    <article className="container my-30">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs uppercase bg-gray-600 text-gray-300">
            <tr>
              <th scope="col" className="px-6 py-5">
                INFRA
              </th>
              <th scope="col" className="px-6 py-5">
                CENTRO ESCOLAR
              </th>
              <th scope="col" className="px-6 py-5">
                RUBRO
              </th>
              <th scope="col" className="px-6 py-5">
                MONTO
              </th>
              <th scope="col" className="px-6 py-5">
                CREADO POR
              </th>
              <th scope="col" className="px-6 py-5">
                FECHA
              </th>
              <th scope="col" className="px-6 py-5">
                ACCIONES
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <GridItem data={item} key={item.id} />
            ))}
          </tbody>
        </table>
      </div>
    </article>
  )
}
