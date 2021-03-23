// Third-party dependencies
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  // The human-readable name of the designated location (e.g. "Prices Rooms")
  // Empty string if no location has been designated
  name: '',

  // Whether this is device is designated for a Buttons installation
  isButtonsLocation: false,

  // Whether this device is designated for a Sensors instsallation
  isSensorLocation: false,

  // Whether this device is running in demo mode
  isDemo: false,
}

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setIsButtonsLocation(state, action) {
      state.isButtonsLocation = action.payload
    },
    setIsDemo(state, action) {
      state.isDemo = action.payload
    },
    setIsSensorLocation(state, action) {
      state.isSensorLocation = action.payload
    },
    setLocationName(state, action) {
      state.name = action.payload
    },
  },
})

export const { setIsButtonsLocation, setIsDemo, setIsSensorLocation, setLocationName } = locationSlice.actions

export default locationSlice.reducer
