// Third-party dependencies
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  // The human-readable name of the designated location (e.g. "Prices Rooms")
  // Empty string if no location has been designated
  name: '',

  // I anticipate things like whether this is a Buttons and/or Sensors location would also go in here
}

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setLocationName(state, action) {
      state.name = action.payload
    },
  },
})

export const { setLocationName } = locationSlice.actions

export default locationSlice.reducer
