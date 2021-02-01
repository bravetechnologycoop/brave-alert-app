// Third-party dependencies
import { createSlice } from '@reduxjs/toolkit'

// In-house dependencies
import { ALERT_STATUS, ALERT_TYPE } from '../../constants'

const initialState = [
  {
    id: 'guid-123-abc',
    alertStatus: ALERT_STATUS.RESPONDING,
    location: 'Room 302',
    category: 'Accidental',
    alertType: ALERT_TYPE.BUTTONS_NOT_URGENT,
    numButtonPresses: 2,
    createdTimestamp: 1602327600000, // 2020-10-10 04:00:00
    respondedTimestamp: 1602327630000, // 2020-10-10T04:00:30
    fallbackTimestamp: 1602327840000, // 2020-10-10T04:04:00
    categories: ['Safer Use', 'Overdose', 'Mental Health', 'Other'],
  },
]

const alertsSlice = createSlice({
  name: 'alerts',
  initialState,
  reducers: {
    alertUrgentified(state) {
      state[0].alertType = ALERT_TYPE.BUTTONS_URGENT
    },
  },
})

export const { alertUrgentified } = alertsSlice.actions

export default alertsSlice.reducer
