import Skeleton from 'react-loading-skeleton'

export const HomeSkeleton = () => {
  return (
    <article className="container my-30">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 animate-pulse">
          <thead className="text-xs uppercase bg-gray-400/70 text-gray-300">
            <tr>
              <th scope="col" className="px-6 py-5">
                <Skeleton />
              </th>
              <th scope="col" className="px-6 py-5">
                <Skeleton />
              </th>
              <th scope="col" className="px-6 py-5">
                <Skeleton />
              </th>
              <th scope="col" className="px-6 py-5">
                <Skeleton />
              </th>
              <th scope="col" className="px-6 py-5">
                <Skeleton />
              </th>
              <th scope="col" className="px-6 py-5">
                <Skeleton />
              </th>
              <th scope="col" className="px-6 py-5">
                <Skeleton />
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b bg-gray-400/70 text-white duration-150">
              <td className="px-6 py-4">
                <Skeleton />
              </td>
              <th scope="row" className="px-6 py-4 font-medium text-white">
                <Skeleton />
              </th>
              <td className="px-6 py-4">
                <Skeleton />
              </td>
              <td className="px-6 py-4">
                <Skeleton />
              </td>
              <td className="px-6 py-4 capitalize">
                <Skeleton />
              </td>
              {
                <td className="px-6 py-4">
                  <Skeleton />
                </td>
              }
              <td className="px-6 py-4 text-right">
                <Skeleton />
              </td>
            </tr>
          </tbody>
        </table>
        <div className="px-6 py-5 text-white inset-shadow-teal-50 bg-gray-400/70 animate-pulse">
          <Skeleton />
        </div>
      </div>
    </article>
  )
}
