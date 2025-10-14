import { AgendaSidebar, AgendaPanel } from '../components'

export const Agenda = () => {
  return (
    <section>
      <section className="container grid grid-cols-[25%_minmax(75%,_1fr)] gap-x-5">
        <AgendaSidebar />
        <AgendaPanel />
      </section>
    </section>
  )
}
