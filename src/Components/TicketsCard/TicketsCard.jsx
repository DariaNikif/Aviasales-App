import React from 'react'

import styles from './TicketsCard.module.scss'

const formatTimeDate = (date) => {
  const newDate = new Date(date)
  const hours = newDate.getHours()
  const minutes = newDate.getMinutes()
  return `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}`
}

const formatTimeDuration = (min) => {
  const hours = Math.floor(min / 60)
  const minutes = min % 60
  return `${hours < 10 ? `0${hours}` : hours}ч ${minutes < 10 ? `0${minutes}` : minutes}м`
}

const formatEndTime = (date, min) => {
  const startDate = new Date(date)
  const endDate = new Date(startDate.getTime() + min * 60000)
  const hours = endDate.getHours()
  const minutes = endDate.getMinutes()
  return `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}`
}

const getTransfersWord = (numTransfers) => {
  if (numTransfers === 0) {
    return 'пересадок'
  }
  if (numTransfers === 1) {
    return 'пересадка'
  }
  if (numTransfers >= 2 && numTransfers <= 4) {
    return 'пересадки'
  }
  return 'пересадок'
}

export default function TicketsCard({ ticket }) {
  if (!ticket || !ticket.segments) return null

  return (
    <li className={styles['ticket-card']}>
      <div className={styles['card-header']}>
        <h2 className={styles['card-header__price']}>{ticket.price} Р</h2>
        <div className={styles['card-header__logo']}>
          <img src={`//pics.avs.io/99/36/${ticket.carrier}.png`} alt="company logo" />
        </div>
      </div>
      {ticket.segments.map((segment) => (
        <div key={`${ticket.carrier}-${segment.origin}-${segment.destination}-${segment.date}`} className={styles['ticket-card__content']}>
          <div className={styles['ticket-card__city-time']}>
            <p className={styles['ticket-card__title']}>
              {segment.origin} – {segment.destination}
            </p>
            <p className={styles['ticket-card__value']}>
              {formatTimeDate(new Date(segment.date))} - {formatEndTime(new Date(segment.date), segment.duration)}
            </p>
          </div>
          <div className={styles['ticket-card__travel-time']}>
            <p className={styles['ticket-card__title']}>В пути</p>
            <p className={styles['ticket-card__value']}>{formatTimeDuration(segment.duration)}</p>
          </div>
          <div className={styles['ticket-card__transfers']}>
            <p className={styles['ticket-card__title']}>
              {segment.stops.length} {getTransfersWord(segment.stops.length)}
            </p>
            <p className={styles['ticket-card__value']}>{segment.stops.length === 0 ? 'БЕЗ ПЕРЕСАДОК' : segment.stops.join(', ')}</p>
          </div>
        </div>
      ))}
    </li>
  )
}
