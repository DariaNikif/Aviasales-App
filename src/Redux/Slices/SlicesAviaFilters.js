import { createSlice } from '@reduxjs/toolkit'

export const SlicesAviaFilters = createSlice({
  name: 'filters',
  initialState: {
    statusSorting: ['1 пересадка'],
    statusCheckboxes: [
      { id: 0, text: 'Все', isActive: false },
      { id: 1, text: 'Без пересадок', isActive: false },
      { id: 2, text: '1 пересадка', isActive: true },
      { id: 3, text: '2 пересадки', isActive: false },
      { id: 4, text: '3 пересадки', isActive: false },
    ],
  },
  reducers: {
    filterSelective: (state, action) => {
      const filter = action.payload
      switch (filter) {
        case 'Все': {
          const isActiveAll = !state.statusCheckboxes[0].isActive
          state.statusSorting = isActiveAll ? state.statusCheckboxes.map((checkbox) => checkbox.text) : ['']
          state.statusCheckboxes = state.statusCheckboxes.map((checkbox) => ({ ...checkbox, isActive: isActiveAll }))
          break
        }
        default: {
          const filterCheckbox = state.statusCheckboxes.find((checkbox) => checkbox.text === filter)
          if (filterCheckbox) {
            filterCheckbox.isActive = !filterCheckbox.isActive
          }
          const allActive = state.statusCheckboxes.slice(1).every((checkbox) => checkbox.isActive)
          state.statusCheckboxes[0].isActive = allActive

          if (allActive) {
            state.statusCheckboxes[0].isActive = true
          }

          state.statusSorting = state.statusCheckboxes
            .filter((checkbox) => checkbox.isActive && checkbox.text !== 'Все')
            .map((checkbox) => checkbox.text)
          break
        }
      }
    },
  },
})

export const { filterSelective } = SlicesAviaFilters.actions
export default SlicesAviaFilters.reducer
