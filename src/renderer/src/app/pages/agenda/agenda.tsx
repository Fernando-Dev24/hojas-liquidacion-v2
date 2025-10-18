import { useAgendaStore } from '@renderer/store'
import { AgendaSidebar, AgendaPanel, AgendaNewItem, AgendaEditModal } from '../components'

export const Agenda = () => {
  const { bookingToEdit } = useAgendaStore()

  return (
    <section>
      <section className="container grid grid-cols-[25%_minmax(75%,_1fr)] gap-x-5">
        <AgendaSidebar />
        <AgendaPanel />
      </section>

      <AgendaNewItem id="newBookingModal" />
      {bookingToEdit && <AgendaEditModal id="editBookingModal" />}
    </section>
  )
}
