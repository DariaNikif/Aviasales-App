import { configureStore } from '@reduxjs/toolkit'

import { SlicesAviaFilters } from '../Slices/SlicesAviaFilters'
import { SlicesButtonFilters } from '../Slices/SlicesButtonFilters'
import { SlicesTicketsCard } from '../Slices/SlicesTicketsCard'

const store = configureStore({
  reducer: {
    filters: SlicesAviaFilters.reducer,
    sort: SlicesButtonFilters.reducer,
    tickets: SlicesTicketsCard.reducer,
  },
})

export default store
