import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { filterSelective } from '../../Redux/Slices/SlicesAviaFilters'

import styles from './AviaFilters.module.scss'

export default function AviaFilters() {
  const dispatch = useDispatch()
  const statusSorting = useSelector((state) => state.filters.statusSorting)
  const statusCheckboxes = useSelector((state) => state.filters.statusCheckboxes)

  const checkboxChange = (filter) => {
    dispatch(filterSelective(filter))
  }

  return (
    <aside className={styles['avia-filters']}>
      <h5 className={styles['avia-filters__title']}>Количество пересадок</h5>
      <ul className={styles['avia-filters__list']}>
        {statusCheckboxes.map((option) => {
          const isChecked = statusSorting.includes(option.text)
          return (
            <li className={styles['avia-filters__item']} key={option.id}>
              <label className={styles['label-avia-filters']} htmlFor={`checkbox-${option.id}`}>
                <span className={option.isActive ? styles['custom-checkbox__on'] : styles['custom-checkbox']} />
                <input
                  className={styles['checkbox-avia-filters']}
                  id={`checkbox-${option.id}`}
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => checkboxChange(option.text)}
                />
                {option.text}
              </label>
            </li>
          )
        })}
      </ul>
    </aside>
  )
}
