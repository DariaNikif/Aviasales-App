import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { setActive } from '../../Redux/Slices/SlicesButtonFilters'

import styles from './ButtonFilters.module.scss'

export default function ButtonFilters() {
  const dispatch = useDispatch()
  const sortFilters = useSelector((state) => state.sort)

  return (
    <ul className={styles['button-filters']}>
      {sortFilters.map((sortItem) => (
        <li key={sortItem.id} className={styles['button-filters__item']}>
          <button
            type="button"
            className={`${styles['button-filters__button']} ${sortItem.isActive ? styles['button-filters__button-active'] : ''}`}
            onClick={() => dispatch(setActive(sortItem.id))}
          >
            {sortItem.text}
          </button>
        </li>
      ))}
    </ul>
  )
}
