import { createSlice } from '@reduxjs/toolkit'

export const SlicesButtonFilters = createSlice({
  name: 'sort',
  initialState: [
    { id: 0, text: 'ОПТИМАЛЬНЫЙ', isActive: true },
    { id: 1, text: 'САМЫЙ ДЕШЕВЫЙ', isActive: false },
    { id: 2, text: 'САМЫЙ БЫСТРЫЙ', isActive: false },
  ],
  reducers: {
    setActive: (state, action) => {
      state.forEach((button) => {
        button.isActive = button.id === action.payload
      })
    },
  },
})

export const { setActive } = SlicesButtonFilters.actions
export default SlicesButtonFilters.reducer
