// Third-party dependencies
import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const alertsSlice = createSlice({
  name: 'alerts',
  initialState,
  reducers: {
    setAlerts(state, action) {
      return action.payload
    },
  },
})

export const { setAlerts } = alertsSlice.actions

export default alertsSlice.reducer
