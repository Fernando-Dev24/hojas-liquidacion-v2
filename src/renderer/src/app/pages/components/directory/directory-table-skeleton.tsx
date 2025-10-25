import Skeleton from 'react-loading-skeleton'

export const DirectoryTableSkeleton = () => {
  return (
    <div>
      {/* TABLE */}
      <div className="relative overflow-x-auto shadow-lg sm:rounded-lg mb-14">
        <table className="w-full text-sm text-left text-gray-500 border border-gray-200">
          {/* head */}
          <thead className="text-xs text-gray-500 uppercase bg-gray-200">
            <tr>
              <th scope="col" className="px-6 py-3 ">
                <Skeleton className="!bg-gray-300" />
              </th>
              <th scope="col" className="px-6 py-3">
                <Skeleton className="!bg-gray-300" />
              </th>
              <th scope="col" className="px-6 py-3">
                <Skeleton className="!bg-gray-300" />
              </th>
              <th scope="col" className="px-6 py-3">
                <Skeleton className="!bg-gray-300" />
              </th>
              <th scope="col" className="px-6 py-3">
                <Skeleton className="!bg-gray-300" />
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Acciones</span>
              </th>
            </tr>
          </thead>
          {/* body */}
          <tbody>
            {Array.from([1, 2, 3, 4, 5]).map((_, index) => (
              <tr
                key={index}
                className="bg-white text-secondary border-b border-gray-300 text-base"
              >
                <td className="px-6 py-4">
                  <Skeleton />
                </td>
                <td className="px-6 py-4 font-semibold text-secondary whitespace-nowrap">
                  <Skeleton />
                </td>
                <td className="px-6 py-4 capitalize">
                  <Skeleton />
                </td>
                <td className="px-6 py-4">
                  <Skeleton />
                </td>
                <td className="px-6 py-4">
                  <Skeleton />
                </td>
                <td className="px-6 py-4">
                  <Skeleton />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
