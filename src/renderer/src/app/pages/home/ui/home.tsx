import { Navbar, Landing, PagesGrid, SearchObservationModal } from '../../components'

export const HomePage = () => {
  return (
    <section className="bg-gray-100">
      <Navbar />
      <Landing />
      <PagesGrid />
      <SearchObservationModal id="searchObservationModal" />
    </section>
  )
}
