import Skeleton from 'react-loading-skeleton'

export const AdminUsersSkeleton = () => {
  return (
    <div className="h-[625px] max-h-[800px] overflow-y-auto">
      {Array.from([1, 2, 3]).map((_, index) => (
        <div
          className="relative mb-10 p-5 rounded-lg shadow border border-gray-300 bg-gray-50 animate-pulse"
          key={index}
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <span className="inline-block mr-5 p-2">
                <Skeleton className="skeleton-icon" />
              </span>
              <div>
                <Skeleton className="skeleton-title" />
              </div>
            </div>

            <div>
              <Skeleton className="skeleton-icon" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
