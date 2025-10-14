import { formatWithDay } from '@renderer/helpers'
import clsx from 'clsx'
import { addDays, fromUnixTime, getUnixTime, isToday, isTomorrow, isYesterday } from 'date-fns'
import { useNavigate, useParams } from 'react-router-dom'

type Day = 'yesterday' | 'today' | 'tomorrow'

export const AgendaNavbar = () => {
  const { day } = useParams()
  const navigate = useNavigate()
  const dateParam = fromUnixTime(Number(day))
  const d = new Date()

  const goToDay = (day: Day) => {
    let unix: number = 0

    switch (day) {
      case 'yesterday':
        unix = getUnixTime(addDays(d, -1))
        break
      case 'today':
        unix = getUnixTime(d)
        break
      case 'tomorrow':
        unix = getUnixTime(addDays(d, +1))
        break
      default:
        unix = getUnixTime(d)
        break
    }

    navigate(`/app/agenda/${unix}`, { replace: true })
  }

  return (
    <nav className="relative pt-8 flex justify-center items-center bg-gray-200/50">
      <div className="flex flex-row gap-x-14">
        <button
          className={clsx('agenda-btn-nav', {
            '!text-secondary !border-b-secondary': isYesterday(dateParam)
          })}
          onClick={() => goToDay('yesterday')}
        >
          <p className="capitalize">{formatWithDay(addDays(d, -1))}</p>
        </button>

        <button
          className={clsx('agenda-btn-nav', {
            '!text-secondary !border-b-secondary': isToday(dateParam)
          })}
          onClick={() => goToDay('today')}
        >
          <p className="capitalize">{formatWithDay(d)}</p>
        </button>

        <button
          className={clsx('agenda-btn-nav', {
            '!text-secondary !border-b-secondary': isTomorrow(dateParam)
          })}
          onClick={() => goToDay('tomorrow')}
        >
          <p className="capitalize">{formatWithDay(addDays(d, +1))}</p>
        </button>
      </div>
    </nav>
  )
}
