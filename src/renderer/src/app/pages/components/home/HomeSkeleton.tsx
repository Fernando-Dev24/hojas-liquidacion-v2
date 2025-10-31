import Skeleton from 'react-loading-skeleton'

export const HomeSkeleton = () => {
  return (
    <article className="container my-30">
      <div className="grid grid-cols-3 gap-5">
        {Array.from([1, 2, 3, 4, 5, 6]).map((_, index) => (
          <div
            key={index}
            className="relative flex flex-col bg-white shadow-sm border border-gray-300 rounded-lg duration-150 cursor-pointer"
          >
            <div className="p-10">
              <p className="text-sm text-gray-600 capitalize">
                <Skeleton />
              </p>
              <h5 className="mb-2 text-slate-800 text-lg font-semibold">
                <Skeleton />
              </h5>
              <p className="text-slate-600 leading-normal font-light">
                <Skeleton />
              </p>
              <p className="text-slate-600 leading-normal font-normal">
                <Skeleton />
              </p>
            </div>
          </div>
        ))}
      </div>
    </article>
  )
}
