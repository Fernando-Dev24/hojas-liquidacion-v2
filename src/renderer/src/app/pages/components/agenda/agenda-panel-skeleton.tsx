import Skeleton from 'react-loading-skeleton'

export const AgendaPanelSkeleton = () => {
  return (
    <section className="py-14">
      {Array.from([1, 2, 3]).map((_, index) => (
        <article
          key={index}
          className="relative mb-8 grid grid-cols-[10%_minmax(75%,_1fr)] gap-x-10 p-10 rounded-xl border border-gray-300 bg-gray-100 shadow animate-pulse"
        >
          {/* FECHA Y HORA */}
          <Skeleton className="skeleton-title" count={5} />

          {/* BUTTON */}
          <div className="absolute top-5 right-10 p-1">
            <Skeleton className="skeleton-icon" />
          </div>
        </article>
      ))}
      {/* DATA */}
    </section>
  )
}
