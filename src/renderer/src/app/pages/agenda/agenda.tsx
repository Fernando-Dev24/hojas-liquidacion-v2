import { AgendaNavbar, AgendaSidebar, AgendaPanel } from '../components'

export const Agenda = () => {
  return (
    <section>
      <AgendaNavbar />
      <section className="container grid grid-cols-[25%_minmax(75%,_1fr)] gap-x-5 mt-10">
        <AgendaSidebar />
        <AgendaPanel />
      </section>
    </section>
  )
}
