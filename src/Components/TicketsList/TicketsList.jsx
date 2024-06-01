import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchSearchId, fetchTickets, showMoreTickets } from '../../Redux/Slices/SlicesTicketsCard'
import TicketsCard from '../TicketsCard/TicketsCard'
import { selectors } from '../../Redux/Selectors/SelectorsExport'

import styles from './TicketsList.module.scss'

export default function TicketsList() {
  const searchId = useSelector(selectors.searchId)
  const stop = useSelector(selectors.stop)
  const sort = useSelector(selectors.sort)
  const tickets = useSelector(selectors.tickets)
  const filters = useSelector(selectors.filters)
  const visibleTickets = useSelector(selectors.visibleTickets)
  const error = useSelector(selectors.error)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchSearchId())
  }, [dispatch])

  useEffect(() => {
    if (searchId && !stop) {
      dispatch(fetchTickets())
    }
  }, [dispatch, tickets, stop, searchId])

  const filterTickets = (ticketsArray, filtersArray) => {
    const activeFilters = filtersArray.statusCheckboxes.filter((filter) => filter.isActive)
    if (activeFilters.length === 4) return ticketsArray
    if (!activeFilters.length) return []
    return activeFilters
      .map((filter) =>
        ticketsArray.filter((ticket) => {
          switch (filter.text) {
            case 'Без пересадок':
              return ticket.segments[0].stops.length === 0 && ticket.segments[1].stops.length === 0
            case '1 пересадка':
              return ticket.segments[0].stops.length === 1 && ticket.segments[1].stops.length === 1
            case '2 пересадки':
              return ticket.segments[0].stops.length === 2 && ticket.segments[1].stops.length === 2
            case '3 пересадки':
              return ticket.segments[0].stops.length === 3 && ticket.segments[1].stops.length === 3
            default:
              return ticket
          }
        })
      )
      .flat()
  }

  const sortTickets = (ticketsArray, sortArray) => {
    const activeSort = sortArray.find((item) => item.isActive).id
    switch (activeSort) {
      case 0:
        return [...tickets].sort((a, b) => {
          const optimalValueA = a.price * a.segments[0].duration
          const optimalValueB = b.price * b.segments[0].duration
          return optimalValueA - optimalValueB
        })
      case 1:
        return [...ticketsArray].sort((a, b) => a.price - b.price)
      case 2:
        return [...ticketsArray].sort((a, b) => a.segments[0].duration - b.segments[0].duration)
      default:
        return ticketsArray
    }
  }

  const sortedTickets = sortTickets(tickets, sort)
  const filteredTickets = filterTickets(sortedTickets, filters)

  const ticketsList = filteredTickets
    .map((ticket) => <TicketsCard ticket={ticket} key={ticket.id} />)
    .slice(0, visibleTickets)

  const activeFilters = filters.statusCheckboxes.filter((filter) => filter.isActive)
  return error ? (
    <p className={styles['error-message']}>{error}</p>
  ) : (
    <>
      {!stop ? (
        <div className={styles.loader}>
          <div className={styles.circle} />
          <div className={styles.circle} />
          <div className={styles.circle} />
          <div className={styles.circle} />
          <div className={styles.circle} />
        </div>
      ) : null}
      {activeFilters.length > 0 ? (
        <ul className={styles['tickets-list']}>{ticketsList}</ul>
      ) : (
        <p className={styles['no-flights']}>Рейсов, подходящих под заданные фильтры, не найдено.</p>
      )}
      {ticketsList.length > 0 ? (
        <button className={styles['button-more']} type="button" onClick={() => dispatch(showMoreTickets())}>
          Показать еще 5 билетов!
        </button>
      ) : null}
    </>
  )
}
