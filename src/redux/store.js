// Third-party dependencies
import { configureStore } from '@reduxjs/toolkit'

// In-house dependencies
import alertsReducer from './slices/alertsSlice'
import errorMessageReducer from './slices/errorMessageSlice'
import locationReducer from './slices/locationSlice'
import newNotificationsCountReducer from './slices/newNotificationsCountSlice'

const store = configureStore({
  reducer: {
    alerts: alertsReducer,
    errorMessage: errorMessageReducer,
    location: locationReducer,
    newNotificationsCount: newNotificationsCountReducer,
  },
})

export default store
