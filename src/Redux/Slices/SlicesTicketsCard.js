import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import uniqid from 'uniqid'

export const fetchSearchId = createAsyncThunk('tickets/fetchSearchId', async () => {
  const res = await fetch('https://aviasales-test-api.kata.academy/search')
  const data = await res.json()
  return data
})

export const fetchTickets = createAsyncThunk('tickets/fetchTickets', async (_, { getState, rejectWithValue }) => {
  const state = getState()
  try {
    const res = await fetch(`https://aviasales-test-api.kata.academy/tickets?searchId=${state.tickets.searchId}`)

    if (res.status === 500 || res.status === 502) {
      return { tickets: [], stop: false }
    }

    if (res.status === 400 || res.status === 404) {
      return rejectWithValue('Ошибка соединения с сервером, обновите страницу.')
    }

    const data = await res.json()
    return data
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

export const SlicesTicketsCard = createSlice({
  name: 'tickets',
  initialState: { tickets: [], searchId: null, visibleTickets: 5, error: null },
  reducers: {
    showMoreTickets: (state) => {
      state.visibleTickets += 5
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchId.pending, (state) => {
        state.fetchSearchIdStatus = 'pending'
      })
      .addCase(fetchSearchId.fulfilled, (state, action) => {
        state.searchId = action.payload.searchId
        state.fetchSearchIdStatus = 'resolved'
      })
      .addCase(fetchSearchId.rejected, (state) => {
        state.fetchSearchIdStatus = 'error'
      })
      .addCase(fetchTickets.pending, (state) => {
        state.fetchTicketsStatus = 'pending'
      })
      .addCase(fetchTickets.fulfilled, (state, action) => {
        state.fetchTicketsStatus = 'resolved'
        state.tickets = [...action.payload.tickets.map((ticket) => ({ id: uniqid(), ...ticket })), ...state.tickets]
        state.stop = action.payload.stop
      })
      .addCase(fetchTickets.rejected, (state) => {
        state.fetchTicketsStatus = 'error'
      })
  },
})

export const { showMoreTickets, setOfflineStatus } = SlicesTicketsCard.actions
export default SlicesTicketsCard.reducer
