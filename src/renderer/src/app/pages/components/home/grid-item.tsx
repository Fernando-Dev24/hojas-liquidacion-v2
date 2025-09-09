import { formatDate, formatWithThousand } from '@renderer/helpers'
import { ObservationPage } from '@renderer/interfaces'
import { FiEye } from 'react-icons/fi'

interface Props {
  data: ObservationPage
}

export const GridItem = ({ data }: Props) => {
  return (
    <tr className="border-b bg-secondary border-gray-700 hover:bg-secondary/95 text-white duration-150">
      <td className="px-6 py-4">{data.infra}</td>
      <th scope="row" className="px-6 py-4 font-medium text-white">
        {data.school_name}
      </th>
      <td className="px-6 py-4">{data.department}</td>
      <td className="px-6 py-4">{formatWithThousand(data.amount)}</td>
      <td className="px-6 py-4">{data.createdBy}</td>
      {<td className="px-6 py-4">{formatDate(data.date)}</td>}
      <td className="px-6 py-4 text-right">
        <button className="flex items-center py-2 px-4 rounded bg-gray-600">
          <FiEye size={15} className="mr-3" />
          Ver
        </button>
      </td>
    </tr>
  )
}
