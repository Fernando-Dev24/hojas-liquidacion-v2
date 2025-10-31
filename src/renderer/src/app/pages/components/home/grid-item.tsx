import { formatDate, formatWithThousand } from '@renderer/helpers'
import { ObservationPage } from '@renderer/interfaces'
import { useItem } from '../../home/hooks'

interface Props {
  data: ObservationPage
}

export const GridItem = ({ data }: Props) => {
  const { handleNavigate } = useItem(data)

  return (
    <div
      className="relative flex flex-col bg-white shadow-sm border border-gray-400 rounded-lg duration-150 hover:bg-slate-100/80 cursor-pointer"
      onClick={handleNavigate}
    >
      <div className="p-10">
        <p className="text-sm text-gray-600 capitalize">
          {data.infra} - {data.createdBy} - {formatDate(data.date)}
        </p>
        <h5 className="mb-2 text-slate-800 text-lg font-semibold">{data.school_name}</h5>
        <p className="text-slate-600 leading-normal font-light">{data.department}</p>
        <p className="text-slate-600 leading-normal font-normal">
          {formatWithThousand(data.amount)}
        </p>
      </div>
    </div>
  )
}
