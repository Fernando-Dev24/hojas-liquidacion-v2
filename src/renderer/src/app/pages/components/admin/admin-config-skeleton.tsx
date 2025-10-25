import Skeleton from 'react-loading-skeleton'

export const AdminConfigSkeleton = () => {
  return (
    <div className="relative admin-panel-wrapper !bg-gray-300">
      {/* HEADER */}
      <div className="flex items-center gap-x-8 mb-14">
        <Skeleton className="skeleton-icon" />
        <div>
          <Skeleton className="skeleton-title" />
          <Skeleton className="skeleton-p" />
        </div>
      </div>

      {/* SETTINGS */}
      <div className="flex flex-col gap-y-12">
        <div>
          <div className="config-option">
            <div className="flex items-center text-[20px] gap-x-3">
              <Skeleton className="skeleton-icon" />
              <Skeleton className="skeleton-title" />
            </div>
            <Skeleton className="skeleton-btn" />
          </div>
        </div>

        <div>
          <div className="config-option">
            <div className="flex items-center text-[20px] gap-x-3">
              <Skeleton className="skeleton-icon" />
              <Skeleton className="skeleton-title" />
            </div>
            <Skeleton className="skeleton-btn" />
          </div>
        </div>

        <div className="absolute bottom-12 right-12 flex items-center gap-x-5">
          <div className="btn-confirm">
            <Skeleton className="skeleton-btn" />
          </div>
          <div className="btn-confirm">
            <Skeleton className="skeleton-btn" />
          </div>
        </div>
      </div>
    </div>
  )
}
