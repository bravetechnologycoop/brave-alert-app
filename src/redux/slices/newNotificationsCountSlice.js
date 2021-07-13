// Third-party dependencies
import { createSlice } from '@reduxjs/toolkit'

const initialState = 0

const newNotificationsCountSlice = createSlice({
  name: 'newNotificationsCount',
  initialState,
  reducers: {
    setNewNotificationsCount(state, action) {
      return action.payload
    },
  },
})

export const { setNewNotificationsCount } = newNotificationsCountSlice.actions

export default newNotificationsCountSlice.reducer
