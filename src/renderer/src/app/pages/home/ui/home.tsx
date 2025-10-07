import { Navbar, Landing, PagesGrid, SearchObservationModal } from '../../components'

export const HomePage = () => {
  return (
    <section>
      <Navbar />
      <Landing />
      <PagesGrid />
      <SearchObservationModal id="searchObservationModal" />
    </section>
  )
}
