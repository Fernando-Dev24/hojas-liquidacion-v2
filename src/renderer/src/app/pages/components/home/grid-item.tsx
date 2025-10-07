import { formatFirebaseDate, formatWithThousand } from '@renderer/helpers'
import { ObservationPage } from '@renderer/interfaces'
import { FiEye } from 'react-icons/fi'
import { useItem } from '../../home/hooks'

interface Props {
  data: ObservationPage
}

export const GridItem = ({ data }: Props) => {
  const { handleNavigate } = useItem(data)

  return (
    <tr className="border-b bg-secondary border-gray-700 hover:bg-secondary/90 text-white duration-150">
      <td className="px-6 py-4">{data.infra}</td>
      <th scope="row" className="px-6 py-4 font-medium text-white">
        {data.school_name}
      </th>
      <td className="px-6 py-4">{data.department}</td>
      <td className="px-6 py-4">{formatWithThousand(data.amount)}</td>
      <td className="px-6 py-4 capitalize">{data.createdBy}</td>
      {<td className="px-6 py-4">{formatFirebaseDate(data.date)}</td>}
      <td className="px-6 py-4 text-right">
        <button
          className="flex items-center py-2 px-4 rounded bg-gray-600 cursor-pointer hover:bg-secondary/90 duration-150"
          onClick={handleNavigate}
        >
          <FiEye size={15} className="mr-3" />
          Ver
        </button>
      </td>
    </tr>
  )
}
